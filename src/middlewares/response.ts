import { logger } from './logger'
import { Context, Next } from 'koa'
import HttpError from '../core/httpError'
export const responseHandler = async (ctx: Context, next: Next) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 200,
      message: ctx.result.msg || '成功',
      data: ctx.result.data,
    }
    await next()
  }

}

export const errorHandler = (ctx: Context, next: Next) => {

  return next().catch((err) => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      ctx.body = {
        code: err.code || -1,
        data: null,
        msg: err.msg.trim() || '失败',
      }
      ctx.status = 200
    }
    return Promise.resolve()
  })
}
