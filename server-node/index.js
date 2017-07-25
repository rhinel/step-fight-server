'use strict'

// 启动服务
let http = require('http')
let https = require('https')
let fs = require('fs')
let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let rfs = require('rotating-file-stream')
let db = require('./models')
let log4js = require('log4js')
let configLog = require('./config-log')
let favicon = require('serve-favicon')

// 启动缓存链接
db.redisct()
// 启动数据库链接
db.connect()

// 启动路由及端口处理
let reapp = express()
let app = express()

// http转发
let httpServer = http.createServer(reapp)
const httpPORT = process.env.HTTPPORT || 8080
reapp.all('*', function(req, res) {
  return res.redirect("https://" + req.headers["host"].replace('8080', '443') + req.url)
})

//https-ssl
let httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../../ssl-key/ssl-fs.rhinel.xyz/ssl-key.key'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../../ssl-key/ssl-fs.rhinel.xyz/ssl-key.pem'), 'utf8'),
  ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4',
  honorCipherOrder: true
}, app)
const httpsPORT = process.env.HTTPSPORT || 443
app.use(favicon(path.join(__dirname, '../static', 'icon-cloud.png')))

// 处理日志
log4js.configure(configLog)
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }))
let sysLog = log4js.getLogger('sys')

// 路由
app.use(express.static(__dirname + '/'))
// 使用post&json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// 处理路由
require('./routes')(app, express)

// 启动监听
sysLog.info('--------------------------------------')
sysLog.info(new Date().toLocaleString())
httpServer.listen(httpPORT, ()=>{
  sysLog.info('TechNode http is on port ' + httpPORT + '!') 
})

httpsServer.listen(httpsPORT, ()=>{
  sysLog.info('TechNode https is on port ' + httpsPORT + '!') 
})
