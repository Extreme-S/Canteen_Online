const db = wx.cloud.database()
const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    value: "",
    show: false,
    canteen: "全部",
    goods: [],
  },

  showPopup: function(event) {
    this.setData({
      show: true
    }); 
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onShow: function() {
    this.getTabBar().init(); //初始化底部导航栏
    this.getData(res => {});
  },

  onPullDownRefresh: function() {
    this.setData({
      goods: [],
    })
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  onReachBottom: function() {
    this.getData(res => {});
  },

  onLoad: function() {
    //检测授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../authorization/authorization',
          })
        }
      }
    })

    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    console.log(date)
    console.log(date.toLocaleString())
  },



  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('Menu').skip(this.pageData.skip).get().then(res => {
      this.decodeWindow(res.data)
      let oldData = this.data.goods;
      this.setData({
        goods: oldData.concat(res.data),
      }, res => {
        this.pageData.skip = this.pageData.skip + 20;
        wx.hideLoading()
        callback();
      })
    })
  },
  //译码
  decodeWindow: function(goods) {
    //console.log(goods)
    for (var i = 0; i < goods.length; i++) {
      var floorCode = goods[i].meal_window.substring(0, 7).concat('00')
      var j = parseInt(goods[i].meal_window.substring(7, 9)) -1
      var window = adminSite.windows[floorCode][j]
      goods[i].meal_window = window.canteen + window.floor + window.name
      //console.log(goods)
    }
  },

  pageData: {
    skip: 0,
  }
})

