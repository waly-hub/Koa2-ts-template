import type koa from 'koa'
import path from 'path'
import autoRegisterRouter from '../utils/autoImportFiles'

// 注册路由
export function registerRouter(app: koa) {
  autoRegisterRouter(path.join(__dirname, './modules'), false, /\.ts$/, app)
}
