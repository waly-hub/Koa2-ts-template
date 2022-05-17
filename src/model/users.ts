import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import util from 'util'
import SECRET from "../config/jwt";
const verify = util.promisify(jwt.verify)
import HttpError from "../core/httpError";

const UserSchema = new mongoose.Schema({
  username: String,
  pwd: String
})

const User = mongoose.model('users', UserSchema)

class UserModel {
  register(username: string, pwd: string) {
    return new Promise((resolve, reject) => {
      User.create({
        username,
        pwd
      }, (err: any, res: any) => {
        if (err) {
          throw new HttpError(err, 200, 500)
        } else {
          resolve({
            msg: '注册成功',
          })
        }
      })
    })
  }
  login(username: string, pwd: string) {
    return new Promise((resolve, reject) => {
      User.findOne({ username }, (err: any, res: any) => {
        if (err) {
          throw new HttpError(err, 200, 500)
        } else {
          if (res && res.pwd === pwd) {
            const token = jwt.sign({ username }, SECRET, { expiresIn: '24h' })
            resolve({
              msg: '用户登录成功',
              data: {
                token
              }
            })
          }
          resolve({
            msg: '用户不存在'
          })
        }
      })
    })
  }
}

export default new UserModel()