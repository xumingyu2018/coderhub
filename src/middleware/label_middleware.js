const labelService = require("../service/label_service")

// 传入label时，不确定labels是否有name已经存在label表中
// 所以需要将labels都保存在label中，获取labels的id
// 将获取的数据传递给下一个中间件
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有labels
  const { labels } = ctx.request.body

  // 2.判断所有的labels中name是否已经存在于label表
  const newLabels = []
  for(const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }
    if(result) {
      // 获取name对应的label的id => { name: "篮球", id: 1 }
      labelObj.id = result.id
    }else { 
      // 插入，并且获取插入之后的id => { name: "游戏", id: 7 }
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    } 
    newLabels.push(labelObj)
  }

  // 3.所有的label都变成[{ name: "哲学", id: 7}, { name: "爱情", id: 8 }]
  ctx.labels = newLabels
 
  await next()
}

module.exports = verifyLabelExists