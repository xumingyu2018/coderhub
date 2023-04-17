// 动态加载路由（在app中自动注册）
const fs = require('fs')

function registerRouters(app) {
  // 1.读取当前文件下的所有文件
  const files = fs.readdirSync(__dirname)

  // 2.遍历所有文件
  for(const file of files) {
    // 只留下带router.js结尾的文件
    if(!file.endsWith('_router.js')) continue
    const router =require(`./${file}`)
    app.use(router.routes()) 
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters