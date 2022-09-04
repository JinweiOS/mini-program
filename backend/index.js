const http = require('http')
const database = []
const DATA_SET = '/set'
const DATA_GET = '/get'

const server = http.createServer((req, res) => {
  // 业务逻辑
  switch(req.url) {
    case DATA_SET: {
      database.push(decodeURIComponent(req.headers.content))
      res.end(JSON.stringify({success: true, data: database}))
      break;
    }
    case DATA_GET: {
      res.end(JSON.stringify({success: true, data: database}))
      break;
    }
    default: res.end(JSON.stringify({success: false, code: 404, msg: '未找到此路径'}))
  }
})

server.listen(3000, () => console.log('server is listening on http://localhost:3000'))