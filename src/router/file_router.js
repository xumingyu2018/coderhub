const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login_middleware');
const { handleAvatar } = require('../middleware/file_middleware');
const { create } = require('../controller/file_controller');

const fileRouter = new KoaRouter({ prefix: '/file'})  

// 头像上传
fileRouter.post('/avatar', verifyAuth, handleAvatar, create)

module.exports = fileRouter