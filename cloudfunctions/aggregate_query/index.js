const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  var data
  await db.collection(event.collection).aggregate()
    .lookup({
      from: event.from,
      localField: event.localField,
      foreignField: event.foreignField,
      as: event.as,
    })
    .end()
    .then(res => {
      data = res
    })
    .catch(err => console.error(err))
    return data
}