'use strict'

let path = require('path')

module.exports = {
  appenders: {
    http: {
      type: 'DateFile',
      filename: path.resolve(__dirname, '../logs/httpLogs/logs') + 'Http.log',
      maxLogSize: 102400,
      backups: 1024
    },
    sys: {
      type: 'DateFile',
      filename: path.resolve(__dirname, '../logs/sysLogs/logs') + 'Sys.log',
      maxLogSize: 102400,
      backups: 1024
    },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    http: { appenders: ['http'], level: 'info' },
    sys: { appenders: ['sys', 'console'], level: 'info' }
  }
}
