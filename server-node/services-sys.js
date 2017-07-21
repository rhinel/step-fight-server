'use strict'

let db = require('./models')

module.exports = {

  // logs auth
  async logsAuth (req, res, callback) {
    try {

      let auth = req.query.auth
      if (!auth) throw new Error('校验不通过，无法查看日志')

      let checkAuth = await (() => {
        return new Promise((resolve, reject) => {

          reject('o')

        })
      })()

    } catch (err) {
      callback({
        data: err.message || err
      })
    }
  }

}
