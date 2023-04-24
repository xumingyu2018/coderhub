const labelService = require("../service/label_service")

class labelRouter {
  async create(ctx, next) {
    // 1.获取数据
    const { name } = ctx.request.body

    // 2.操作数据库
    const result = await labelService.create(name)

    ctx.body = {
      code: 0,
      message: '创建标签成功',
      data: result 
    }
  }

  async list(ctx, next) {
    ctx.body = {
      code: 0,
      message: '获取标签成功',
      data: result 
    }
  }
}

module.exports = new labelRouter()