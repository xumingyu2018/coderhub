// 这里存放具体的业务逻辑代码
const userService = require("../service/user_service");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的数据
    const user = ctx.request.body

    // 2.将用户数据保存到数据库中
    const result = await userService.create(user)

    // 3.查看存储结果，告知前端创建成功 
    ctx.body = {
      message: '用户创建成功',
      data: result
    }
  }
}

module.exports = new UserController()