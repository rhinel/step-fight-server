'use strict'

let db = require('./models')

let auth = require('./auth')

module.exports = {

  // logs auth
  async logsAuth (req, res, callback) {
    try {

      let pass = req.query.auth
      if (!pass) throw new Error('校验不通过，无法查看日志')

      let checkAuth = await (() => {
        return new Promise((resolve, reject) => {
          if (auth.pass != pass) {
            reject('校验不通过，无法查看日志')
          } else {
            resolve()
          }

        })
      })()

      callback({
        type: true,
        data: checkAuth
      })
    } catch (err) {
      callback({
        data: err.message || err
      })
    }
  }

}
