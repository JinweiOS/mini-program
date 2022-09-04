const Koa = require('koa')
const axios = require('axios')
const Router = require('koa-router')
const server = new Koa();
const APP_SECRET_KEY = 'your secret key'
const APP_ID = 'app id'

// router的创建
const routerIns = new Router()
routerIns.get('/auth', async (ctx) => {
  const userCode = ctx.query && ctx.query.code
  console.log(userCode)
  // TODO: 发送请求至微信的验证服务器
  const reslut = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET_KEY}&js_code=${userCode}&grant_type=authorization_code`)
  console.log(reslut)
  ctx.body = {
    success: true,
    token: reslut.data.openid
  }
})

server.use(routerIns.routes())
server.use(routerIns.allowedMethods())

server.listen(3001, () => 'auth-server is staring and listening on 3001')