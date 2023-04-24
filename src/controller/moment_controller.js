const { QUERY_IS_FAIL } = require("../config/error");
const momentService = require("../service/moment_service")

class MomentController{
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body

    // 2.动态由谁发布（token => id/username）
    // 由上一个中间件传递过来的ctx.user确定
    const { id } = ctx.user

    // 3.将动态相关数据保存到数据库中
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '创建用户动态成功',
      data: result 
    }
  }

  async list(ctx, next) {
    // 获取分页条件(moment?offset=0&size=10 -> query)
    const { offset, size } = ctx.query

    // 从数据库中查询动态表
    const result = await momentService.queryList(offset, size)

    // 返回结果
    ctx.body = {
      code: 0,
      message: '查询动态成功',
      data: result
    }
  }

  async detail(ctx, next) {
    // 1.获取动态的id(moment/1)
    const { momentId } = ctx.params

    // 2.根据id查询某一条动态
    const result = await momentService.queryById(momentId)

    // 3.若没有查到，返回错误信息
    if(!result.length) {
      return ctx.app.emit('error', QUERY_IS_FAIL, ctx)
    }

    // 4.成功则返回数据
    ctx.body = {
      code: 0,
      message: '查询1条动态成功',
      data: result[0]
    }
  }

  async update(ctx, next) {
    // 1.获取要修改的动态的id
    const { momentId } = ctx.params 

    // 2.获取修改的内容
    const { content } = ctx.request.body

    const result = await momentService.updateMoment(momentId, content)

    ctx.body = {
      code: 0,
      message: '修改动态成功',
      data: result
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.removeMoment(momentId)
    ctx.body = {
      code: 0,
      message: '删除动态成功',
      data: result
    }
  }

  // 标签接口，给moment添加label
  async addLabels(ctx, next) {
    // 1.获取参数
    const { labels } = ctx
    const { momentId } = ctx.params

    // 2.将moment_id和label_id添加到moment_label表中
    try{
      for(const label of labels) {
        // 2.1判断label_id是否已经和moment_id已经存在该数据
        const isExists = await momentService.hasLabel(momentId, label.id)
        console.log(isExists);
        if(!isExists) {
          // 2.2不存在moment_id和label_id关系，则插入
          const result = await momentService.addLabel(momentId, label.id)
        }
      }
      ctx.body = {
        code: 0,
        message: '为动态添加标签成功',
      }
    }catch (error) {
      console.log(error);
      ctx.body = {
        code: -3001,
        message: '为动态添加标签失败'
      }
    }
  }
}

module.exports = new MomentController()