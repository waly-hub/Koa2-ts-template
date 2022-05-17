import fs from 'fs'
import path from 'path'
import * as log4js from 'log4js';
import LOGPATH from '../config/logger'
import { Context, Next } from 'koa'


if (!fs.existsSync(LOGPATH)) {
  fs.mkdirSync(LOGPATH)
}
// 配置log4.js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: { type: 'dateFile', filename: path.join(LOGPATH, 'default.log'), pattern: '-yyyy-MM-dd' }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('[Default]')
// logger中间件
const loggerMiddleware = async (ctx: Context, next: Next) => {
  // 请求开始时间
  const start = new Date().getTime()
  await next()
  // 结束时间
  const ms = new Date().getTime() - start
  // 打印出请求相关参数
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
  let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}

export { logger, loggerMiddleware }