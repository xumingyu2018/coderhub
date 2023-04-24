const fileService = require("../service/file_service")
const userService = require("../service/user_service")
const { SERVER_HOST, SERVER_PORT } = require('../config/server')

class fileController {
  async create(ctx, next) {
    // 1.获取对应的信息
    const { filename, mimetype, size } =ctx.request.file
    const { id } = ctx.user

    // 2.将图片信息和id结合起来进行数据库存储
    const result = await fileService.create(filename, mimetype, size, id)

    // 3.将头像的url，保存在user表
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)

    // 4.返回结果
    ctx.body = {
      code: 0,
      message: '头像上传成功',
      data: avatarUrl
    }
  }
}

module.exports = new fileController()