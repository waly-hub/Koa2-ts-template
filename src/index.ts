import koa from 'koa'
import koaBody from 'koa-body'
import './config'
import { registerRouter } from './router'


const app = new koa()

app.use(koaBody())

// 注册路由
registerRouter(app)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`http://localhost:${process.env.SERVER_PORT}`);
})