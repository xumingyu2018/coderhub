const crypto = require('crypto')

function md5password(password) {
  const md5 = crypto.createHash('md5')
  // 使用md5 16进制加密
  const md5pwd = md5.update(password).digest('hex')
  return md5pwd
}

module.exports = md5password