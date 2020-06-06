const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    user_orders: []
  },

  onShow: function() {
    this.getTabBar().init(); //初始化底部导航栏
    this.getData(res => {});
  },

  onPullDownRefresh: function() {
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('User_orders').where({
      'user_info.openId': app.globalData.user_info.openId
    }).get().then(res => {
      this.setData({
        user_orders: res.data
      }, res => {
        wx.hideLoading()
        callback()
      })
    })
  }
})