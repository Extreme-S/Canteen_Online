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
    this.setData({
      user_orders: [],
    })
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  onReachBottom: function () {
    this.getData(res => { });
  },


  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('User_orders').where({
      'user_info.openId': app.globalData.user_info.openId
    }).skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.user_orders
      this.setData({
        user_orders: oldData.concat(res.data)
      }, res => {
        this.pageData.skip = this.pageData.skip + 20;
        wx.hideLoading()
        callback()
      })
    })
  },
  pageData:{
    skip:0,
  }
})