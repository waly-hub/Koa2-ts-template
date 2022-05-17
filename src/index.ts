
import koa from 'koa'
import koaBody from 'koa-body'
import Cors from 'koa2-cors'
import KowJwt from 'koa-jwt'

import { registerRouter } from './router'
import './config'
import './db'
import SECRET from './config/jwt'
import usersRouter from './router/modules/users'
import { corsHandler } from './middlewares/cors'
import { loggerMiddleware } from './middlewares/logger'
import { errorHandler, responseHandler } from './middlewares/response'


const app = new koa()
// 日志打印
app.use(loggerMiddleware)
// 错误处理
app.use(errorHandler)
// 跨域
app.use(Cors(corsHandler))
// 开启jwt
app.use(KowJwt({ secret: SECRET }).unless({
  path: [/^\/users\/login/, /^\/users\/register/]
}))
// 请求参数解析
app.use(koaBody())

// 自动注册路由
// registerRouter(app)

// 注册路由
app.use(usersRouter.routes())
// 请求响应处理
app.use(responseHandler)

// 开启服务
app.listen(process.env.SERVER_PORT, () => {
  console.log(`http://localhost:${process.env.SERVER_PORT}`);
})