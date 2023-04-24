const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware')
const { create, reply } = require('../controller/comment_controller')

const commentRouter = new KoaRouter({ prefix: '/comment'}) // 添加路由前缀 


// 增：新增评论
commentRouter.post('/', verifyAuth, create)
// 增：回复评论
commentRouter.post('/reply', verifyAuth, reply)

module.exports = commentRouter

