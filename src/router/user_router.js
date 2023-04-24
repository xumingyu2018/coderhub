const KoaRouter = require('@koa/router')
const { create, showAvatarImage } = require('../controller/user_controller')
const {verifyUser, handlePassword } = require('../middleware/user_middleware')
// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users'}) // 添加路由前缀

// 2.定义路由中映射(这里只做映射处理，不做具体的业务处理)
// 2.1.用户注册接口
userRouter.post('/', verifyUser, handlePassword, create)
// 2.2用户头像查看
userRouter.get('/avatar/:userId', showAvatarImage)

// 3.导出路由
module.exports = userRouter