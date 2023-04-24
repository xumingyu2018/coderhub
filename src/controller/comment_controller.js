const commentService = require("../service/comment_service")

class commentController {
  // 发表评论
  async create(ctx, next) {
    // 1.从body中获取参数
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    console.log(content, momentId, id);

    // 2.操作数据库
    const result = await commentService.create(content, momentId, id)
    console.log(result);

    ctx.body = {
      code: 0,
      message: '发表评论成功',
      data: result 
    }
  }

  // 回复评论
  async reply(ctx, next) {
    // 1.从body中获取参数
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user

    // 2.操作数据库
    const result = await commentService.reply(content, momentId, commentId, id)

    ctx.body = {
      code: 0,
      message: '回复评论成功',
      data: result 
    }
  }
}

module.exports = new commentController()