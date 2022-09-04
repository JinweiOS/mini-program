const http = require('http')
const database = []
const DATA_SET = '/set'
const DATA_GET = '/get'
const LOGIN_GET = '/login'
const APP_SECRET_KEY = '5cc982c01bf52bf53847da28b68cd67f'
const APP_ID = 'wx2e92f1b259b3a4c0'
const axios = require('axios')

const server = http.createServer(async (req, res) => {
  // 业务逻辑
  switch(req.url.pathname) {
    case DATA_SET: {
      database.push(decodeURIComponent(req.headers.content))
      res.end(JSON.stringify({success: true, data: database}))
      break;
    }
    case DATA_GET: {
      res.end(JSON.stringify({success: true, data: database}))
      break;
    }
    case '/login': {
      const url = req.url;
      const start = req.url.indexOf('=')
      console.log(start)
      await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET_KEY}&js_code=JSCODE&grant_type=authorization_code`)
    }
    default: res.end(JSON.stringify({success: false, code: 404, msg: '未找到此路径'}))
  }
})

server.listen(3000, () => console.log('server is listening on http://localhost:3000'))