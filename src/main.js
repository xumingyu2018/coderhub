// 1.导入app
const app = require('./app')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')

// 2.将app启动
app.listen(SERVER_PORT, () => {
  console.log('koa服务器启动成功')
})