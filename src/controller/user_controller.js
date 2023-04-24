// 这里存放具体的业务逻辑代码
const { UPLOAD_PATH } = require("../config/path");
const fileService = require("../service/file_service");
const userService = require("../service/user_service");
const fs = require('fs')

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

  async showAvatarImage(ctx, next) {
    // 1.获取用户id
    const { userId } = ctx.params

    // 2.获取userId对应的头像
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)

    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    // 若不加这一句，浏览器会以文件方式下载图片
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()