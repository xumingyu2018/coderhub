const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const permissionService = require("../service/permission_service")

// 验证：只能验证用户是否有操作moment的权限（不能验证操作其他的权限，可扩展性不强）
// 方法一
const verifyMomentPermission = async (ctx, next) => {
  // 获取修改动态的id
  const { momentId } = ctx.params
  // 获取登录用户id
  const { id } = ctx.user

  // 查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkMoment(momentId, id)
  if(!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  // 执行下一个中间件
  await next()
}

// 方法二(传入参数，实现动态权限认证)
// const verifyPermission = function(resource) {
//   return async (ctx, next) => {
//     // 获取修改动态的id
//     const { momentId } = ctx.params
//     // 获取登录用户id
//     const { id } = ctx.user
  
//     // 查询user的id是否有修改momentId的权限
//     const isPermission = await permissionService.checkMoment(momentId, id)
//     if(!isPermission) {
//       return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
//     }
  
//     // 执行下一个中间件
//     await next()
//   }
// }

// 方法三
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户id
  const { id } = ctx.user

  // 2.获取中资源的name/id
  // name => moment/user/comment
  // params: { momentId: 7}
  // keyName => momentId
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')

  // 查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id)
  if(!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  // 执行下一个中间件
  await next()
}

module.exports = {
  verifyMomentPermission,
  verifyPermission
}