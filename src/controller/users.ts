import type { Context, Next } from 'koa'

class User {
  async register(ctx: Context, next: Next) {
    console.log('ctx', ctx.request.body);
    ctx.body = '用户注册'
  }
  async login(ctx: Context) {
    console.log('ctx', ctx.request.body);
    ctx.body = '用户登录'
  }
}

export default new User()