// npm install dotenv 
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.SERVER_PORT)
module.exports = {
  SERVER_PORT
} = process.env // 从环境变量中解构获取