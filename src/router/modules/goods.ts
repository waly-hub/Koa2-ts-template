import Router from 'koa-router'

const goodsRouter = new Router({ prefix: '/goods' })

goodsRouter.get('/', (ctx, next) => {
  ctx.body = '商品界面'
})

export default goodsRouter