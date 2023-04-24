// npm install dotenv 
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.SERVER_PORT)
module.exports = {
  SERVER_PORT,
  SERVER_HOST
} = process.env // 从环境变量中解构获取