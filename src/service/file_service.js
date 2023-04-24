const connection = require("../app/database")

class FileService {
  async create(filename, mimetype, size, userId) {
    const statement = `insert into avatar (filename, mimetype, size, user_id) values (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async queryAvatarWithUserId(userId) {
    const statement = `select * from avatar where user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    // 拿到最新的头像
    return result.pop()
  }
}

module.exports = new FileService()