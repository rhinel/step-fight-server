'use strict'

let fs = require('fs')
let path = require('path')
let serveIndex = require('serve-index')
let controller = require('./controllers')

module.exports = (app, express) => {
  // 添加目录，可直接读取文件
  
  // log file key
  // app.route('/logs').all(controller.logsAuth)
  app.use('/logs', serveIndex(path.resolve(__dirname, '../logs'), {'icons': true}))
  app.use('/logs', express.static(path.resolve(__dirname, '../logs')))

  // api
  app.route('/api/:class/:function').post(controller.api)

  //默认返回
  app.route('/api/*').post(controller.def)

  // 404
  app.get('*', (req, res) => {
    res.send('页面飘走了！')
  })
}
