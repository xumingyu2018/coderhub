// 这里存放与数据库交互的代码(增删改查)
const connection = require('../app/database')

class UserService {
  // 添加用户
  async create(user) {
    // 1.获取用户user
    const { username, password } = user
    // 2.拼接statement sql语句
    const statement = 'insert into `user` (username, password) values (?, ?);'
    // 3.执行statement
    const [result] = await connection.execute(statement, [username, password])
    return result
  }

  // 根据用户名获取用户信息
  async findUserByName(username) {
    const statement = 'select * from `user` where username = ?;'
    const [values] = await connection.execute(statement, [username])
    return values
  }
}

module.exports = new UserService()