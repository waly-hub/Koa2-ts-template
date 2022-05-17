import Router from 'koa-router'
import User from '../../controller/users'
const usersRouter = new Router({ prefix: '/users' })

usersRouter.post('/register', User.register)

usersRouter.post('/login', User.login)

usersRouter.post('/getUserInfo', User.getUserInfo)



export default usersRouter