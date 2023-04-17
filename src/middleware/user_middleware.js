const { NAME_OR_PASSWORD_IS_EMPTY, USER_ALREADY_EXISTS } = require("../config/error")
const userService = require("../service/user_service")
const md5password = require('../utils/md5')

const verifyUser = async (ctx, next) => {
  // 1.验证用户名和密码是否为空
  const { username, password } = ctx.request.body
  if(!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_EMPTY, ctx)
  }

  // 2.验证用户名是否已存在
  const users = await userService.findUserByName(username)
  if(users.length) {
    return ctx.app.emit('error', USER_ALREADY_EXISTS, ctx)
  }
 
  // 3.执行下一个中间件（异步）
  await next()
}

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body
  // 2.对密码进行加密
  ctx.request.body.password = md5password(password)
  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}