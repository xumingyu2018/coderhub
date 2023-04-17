const connection = require("../app/database")

// 方法一
class PermissionService {
  // 方法一
  async checkMoment(momentId, userId) {
    const statement = `select * from moment where id = ? and user_id = ?`
    const [result] = await connection.execute(statement, [momentId, userId])
    // 长度大于0时说明有权限（能查出对应的moment）
    // !!：转化为boolean类型
    // return !!result.length
    return !!result.length
  }

  // 方法三
  async checkResource(resourceName, resourceId, userId) {
    const statement = `select * from ${resourceName} where id = ? and user_id = ?`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return !!result.length
  }
}



module.exports = new PermissionService()