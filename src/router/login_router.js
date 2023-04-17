const KoaRouter = require('@koa/router')
const { sign, test } = require('../controller/login_controller')
const { verifyLogin, verifyAuth} = require('../middleware/login_middleware')

const loginRouter = new KoaRouter({ prefix: '/login'}) // 添加路由前缀

loginRouter.post('/', verifyLogin, sign)
loginRouter.get('/verify', verifyAuth, test)


module.exports = loginRouter

