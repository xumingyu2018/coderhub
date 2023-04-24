const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware')
const { create, list } = require('../controller/label_controller')

const labelRouter = new KoaRouter({ prefix: '/label'}) // 添加路由前缀 

labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', list)

module.exports = labelRouter

