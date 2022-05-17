import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/koa-test').then(() => {
  console.log('数据库连接成功');
})