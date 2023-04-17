const jwt = require('jsonwebtoken')
const { NAME_OR_PASSWORD_IS_EMPTY, USER_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, UNAUTHORIZATION } = require('../config/error')
const { PUBLIC_KEY } = require('../config/srect')
const userService = require('../service/user_service')
const md5password = require('../utils/md5')


const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 1.验证用户名和密码是否为空
  if(!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_EMPTY, ctx)
  }

  // 2.验证用户名在数据可中是否已存在
  const users = await userService.findUserByName(username)
  const user = users[0]
  if(!user) {
    return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
  }

  // 3.验证密码是否正确
  if(user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }

  // 4.将user对象保存在ctx中
  ctx.user = user

  // 执行下一个中间件(颁发token)
  await next()
}

// 很多请求都要用到验证用户，所用封装到中间件中
const verifyAuth = async (ctx, next) => {
    // 1.获取token
    const authorization =ctx.headers.authorization

    if(!authorization) {
      return ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    // 2.验证token是否有效
    try{
      // 2.1获取token信息
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256']
      })

      // 2.2将token信息保存在ctx中
      ctx.user = result
  
      // 3.执行下一个中间件
      await next()
    }catch (error) {
      ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
}

module.exports = {
  verifyLogin,
  verifyAuth
}