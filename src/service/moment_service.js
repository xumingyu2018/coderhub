const connection = require("../app/database")

class MomentService {
  async create(content, userId) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  // 默认offset = 0 ,size = 10
  // 查询动态列表，包含评论个数，标签个数
  async queryList(offset = 0, size = 10) {
    const statement = `
      select m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, json_object('id', u.id, 'username', u.username, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (select count(*) from comment where comment.moment_id = m.id) commentCount,
      (select count(*) from moment_label ml where ml.moment_id = m.id) labelCount
      from moment m
      left join user u on u.id = m.user_id
      limit ? offset ?
    `
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }
  
  // 查询动态详情，包含评论列表，用户列表
  async queryById(id) {
    const statement = `
      select
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        json_object('id', u.id, 'username', u.username, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
        (
          select 
            json_arrayagg(json_object(
              'id', c.id, 'content', c.content, 'commentId', c.comment_id,
              'user', json_object('id', cu.id, 'name', cu.username, 'avatarUrl', u.avatar_url)
            ))
          from comment c 
          left join user cu on c.user_id = cu.id
          where c.moment_id = m.id
        ) comments,
        (
          json_arrayagg(json_object(
            'id', l.id, 'name', l.name
          ))
        ) labels
      from moment m
      left join user u on u.id = m.user_id 
      left join moment_label ml on ml.moment_id = m.id
      left join label l on ml.label_id = l.id
      where m.id = ?
      group by m.id;
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

  // 判断标签和动态表关系是否存在
  async hasLabel(momentId, labelId) {
    const statement = `select * from moment_label where moment_id = ? and label_id = ?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }

  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label (moment_id, label_id) values (?, ?)`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }


}

module.exports = new MomentService()