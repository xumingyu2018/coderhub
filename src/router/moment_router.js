const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware')
const { create, list, detail, update, remove } = require('../controller/moment_controller')
const { verifyMomentPermission, verifyPermission} = require('../middleware/permission_middleware')

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
 
module.exports = momentRouter

