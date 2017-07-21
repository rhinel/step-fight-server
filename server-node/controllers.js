'use strict'

let code = require('./codes')
let serviceSys = require('./services-sys')

// res.json([req.params,req.query,req.body])
// res.json([req.params==url,req.query==get,req.body==post])
// data是一个设计的返回对象，包含编码和内容，使用codes进行封装

const logsAuth = (req, res, next) => {

  serviceSys.logsAuth(req, res, (data) => {
    if (!data || !data.type) {
      res.json(code(1001, data))
    } else {
      next()
    }
  })

}

module.exports = {
  logsAuth
}
