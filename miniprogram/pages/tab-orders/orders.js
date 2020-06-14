const app = getApp()
const db = wx.cloud.database()
var adminSite = require('../../utils/admin_site.js')
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
        '_openid': app.globalData.user_info.openId
      })
      .orderBy('submission_time','desc')
      .skip(this.pageData.skip)
      .get().then(res => {
        //console.log(res.data)
        this.decodeWindow(res.data)
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
  },

   //译码
  decodeWindow: function (orders) {
    //console.log(orders)
    for (var i = 0; i < orders.length; i++) {
      var floorCode = orders[i].meal_orders[0].meal_window.substring(0, 7).concat('00')
      var j = parseInt(orders[i].meal_orders[0].meal_window.substring(7, 9)) - 1
      var window = adminSite.windows[floorCode][j]
      orders[i].meal_orders[0].meal_window = window.canteen + window.floor + window.name
      //console.log(orders)
    }
  },
})