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

  onReachBottom: function() {
    this.getData(res => {});
  },


  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('User_orders')
      .where({
        'user_info.openId': app.globalData.user_info.openId
      })
      .orderBy('submission_time','desc')
      .skip(this.pageData.skip)
      .get().then(res => {
        let oldData = this.data.user_orders
        let newData = res.data
        //时间格式转换
        for (var i = 0; i < newData.length; i++) {
          newData[i].submission_time = newData[i].submission_time.toLocaleString()
        }
        this.setData({
          user_orders: oldData.concat(newData)
        }, res => {
          this.pageData.skip = this.pageData.skip + 20;
          wx.hideLoading()
          callback()
        })

      })
  },
  pageData: {
    skip: 0,
  }
})