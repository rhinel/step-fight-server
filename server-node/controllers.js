'use strict'

let code = require('./codes')
let serviceSys = require('./services-sys')
let servicesApi = require('./services-api')

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

const api = (req, res, next) => {

  if (req.params.class === 'wchat') {
    if (req.params.function === 'getLogin') {
      servicesApi.getLogin(req, res, (data) => {
        res.json(code(2001, data))
      })
    } else if (req.params.function === 'getEncryptedData') {
      servicesApi.getEncryptedData(req, res, (data) => {
        res.json(code(2002, data))
      })
    } else {
      next()
    }
  } else {
    next()
  }

}

//default类，最后返回
const def = (req, res, next)=>{

  res.json(code(9999))

}

module.exports = {
  logsAuth,
  api,
  def
}
