const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware')
const { create, list, detail, update, remove, addLabels } = require('../controller/moment_controller')
const { verifyMomentPermission, verifyPermission} = require('../middleware/permission_middleware')
const verifyLabelExists = require('../middleware/label_middleware')

const momentRouter = new KoaRouter({ prefix: '/moment'}) // 添加路由前缀 

// 编写接口
// 增
momentRouter.post('/', verifyAuth, create)
// 查
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
// 改（只有登录【verifyAuth】且有权限【verifyMomentPermission】才能改）
// momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, update)
// 删
// momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, remove)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 添加标签
// 中间件：
//   1.是否登录
//   2.验证是否有操作这个动态的权限
//   3.额外中间件：验证label的name是否已经存在于label表中
//   * 如果存在，那么直接使用即可
//   * 如果不存在，那么需要先将label的name添加label表
//   4.最终步骤
//   * 所有的labels都已经在label表
//   * 动态2和label关系，添加到关系表
momentRouter.post('/:momentId/labels', verifyLabelExists, addLabels)
 
module.exports = momentRouter

