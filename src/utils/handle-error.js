const app = require("../app");
const { NAME_OR_PASSWORD_IS_EMPTY, USER_ALREADY_EXISTS, USER_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, UNAUTHORIZATION, QUERY_IS_FAIL, OPERATION_IS_NOT_ALLOWED } = require("../config/error");

// 注意：在main.js中需要引入一下
app.on('error', (error, ctx) => {
  let code = 0
  let message =''

  switch(error) {
    case NAME_OR_PASSWORD_IS_EMPTY:
      code = -1001,
      message = '账户或密码为空'
      break
    case USER_ALREADY_EXISTS:
      code = -1002,
      message = '用户已存在'
      break
    case USER_IS_NOT_EXISTS:
      code = -1003,
      message = '用户不存在'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004,
      message = '密码不正确'
      break
    case UNAUTHORIZATION:
      code = -1005,
      message = '无效的token'
      break
    case QUERY_IS_FAIL:
      code = -1006,
      message = '查询失败，请检查数据是否存在'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001,
      message = '本次操作没有权限'
      break
  }

  ctx.body = {code, message}
})

