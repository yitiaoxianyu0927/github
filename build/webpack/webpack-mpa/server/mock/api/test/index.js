const Mock = require('mockjs') 
// import Mock from 'mockjs'

let test = {
  getme: {
    name: 'jack1',
    age: 123,
    gender: '男',
    xuexi: 'aa'
  },
  getshe: Mock.mock({
    'error': 0,
    'message': 'success',
    'result|5': [{
      'author': '@name',
      'comment': '@cparagraph',
      'date': '@datetime'
    }]
  })
}

module.exports = {
  ...test
}
