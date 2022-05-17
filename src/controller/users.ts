import type { Context, Next } from 'koa'
import UserModel from '../model/users'
import { logger } from '../middlewares/logger'
import jwt from 'jsonwebtoken'
import SECRET from "../config/jwt";
import HttpError from '../core/httpError';

class User {
  async register(ctx: Context, next: Next) {
    const { username, pwd } = ctx.request.body
    const res = await UserModel.register(username, pwd)
    ctx.result = res
    await next()
  }
  async login(ctx: Context, next: Next) {
    const { username, pwd } = ctx.request.body
    const res = await UserModel.login(username, pwd)
    ctx.result = res
    await next()
  }
  async getUserInfo(ctx: Context, next: Next) {
    const token = ctx.header.authorization
    if (token) {
      let data = jwt.verify(token.split(' ')[1], SECRET)  // // 解密，获取payload
      ctx.result = {
        msg: '查询成功',
        data: {
          data
        }
      }
      await next()
    } else {
      throw new HttpError('获取用户信息失败', 200, 500)
    }
  }
}

export default new User()