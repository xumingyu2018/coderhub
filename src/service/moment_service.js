const connection = require("../app/database")

class MomentService {
  async create(content, userId) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  // 默认offset = 0 ,size = 10
  async queryList(offset = 0, size = 10) {
    const statement = `
      select m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, json_object('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) user
      from moment m
      left join user u on u.id = m.user_id
      limit ? offset ?
    `
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }

  async queryById(id) {
    const statement = `
      select m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, json_object('id', u.id, 'username', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt) user
      from moment m
      left join user u on u.id = m.user_id
      where m.id = ?
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async updateMoment(id, content) {
    const statement = `update moment set content = ? where id = ?`
    const [result] = await connection.execute(statement, [content, id])
    return result 
  }

  async removeMoment(id) {
    const statement = `delete from moment where id = ?`
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new MomentService()