const fs = require('fs')

// 默认情况下相对目录和node程序的启动目录有关系（"start": "nodemon ./src/main.js"）
const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key')
const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key')

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}