'use strict'

// 提供默认错误提示
const codeList = {

  1000: '接口失败',
  1001: '日志权限校验失败'

}

// 根据接口使用返回格式化
module.exports = (code, data) => {
  !code && (code = 1000)
  !data && (data = {
    type: false,
    data: ''
  })

  if (!data.type) {
    return {
      code: data.code || code,
      msg: data.data || codeList[data.code || code] || '未定义错误'
    }
  } else {
    return {
      code: 0,
      data: data.data || ''
    }
  }
}
