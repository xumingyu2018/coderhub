const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/srect')

class LoginRouter{
  sign(ctx, next) {
    // 1.获取用户id和密码
    const { id, username } = ctx.user

    // 2.颁发令牌
    const token = jwt.sign({ id, username}, PRIVATE_KEY, { 
      expiresIn: 60 * 60 * 24, 
      algorithm: 'RS256' 
    })

    // 3.返回用户信息
    ctx.body = { code: 0, data: { id, username, token }}

  }

  // 验证token
  test(ctx, next) {
    ctx.body = { code: 0, data: '验证成功' }
  }
}

module.exports = new LoginRouter()