'use strict'

let db = require('./models')
let WXBizDataCrypt = require('./WXBizDataCrypt')
let superagent = require('superagent')

let auth = require('./auth')

let appId = auth.appId
let secret = auth.secret

module.exports = {

  async getLogin (req, res, callback) {
    try {
      let session_key = await (() => {
        return new Promise((resolve, reject) => {
          superagent
          .post('https://api.weixin.qq.com/sns/jscode2session')
          .query({
            appid: appId,
            secret: secret,
            js_code: req.body.code,
            grant_type: 'authorization_code'
          })
          .end((err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(JSON.parse(res.text))
            }
          })
        })
      })()

      callback({
        type: true,
        data: session_key
      })
    } catch (err) {
      callback({
        data: err.message || err
      })
    }
  },

  getEncryptedData (req, res, callback) {
    try {
      let pc = new WXBizDataCrypt(appId, req.body.session_key)
      let data = pc.decryptData(req.body.encryptedData , req.body.iv)

      callback({
        type: true,
        data: data
      })
    } catch (err) {
      callback({
        data: err.message || err
      })
    }
  }

}
