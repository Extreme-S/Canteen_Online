const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

//获取用户的openid
exports.main = async(event, context) => {
  return event.userInfo; //返回用户信息
}