const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    user_orders:[]
  },

  onShow() {
    var that = this
    this.getTabBar().init();
    db.collection('User_orders').where({
      'user_info.openId': app.globalData.user_info.openId
    }).get().then(res => {
      that.setData({
        user_orders:res.data
      })
      //console.log(that.data.user_orders)
    })
  },

})