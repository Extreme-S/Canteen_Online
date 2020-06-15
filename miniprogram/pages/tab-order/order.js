const db = wx.cloud.database()
const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    value: "",
    show: false,
    goods: [],
    activeKey: 0,
  },

  //弹出层的显示 
  showPopup: function(event) {
    this.setData({
      show: true
    });
  },

  //弹出层的关闭
  onClose() {
    this.setData({
      show: false
    });
  },

  //弹出层内容：侧边栏状态切换
  onChange(event) {
    this.setData({
      canteen_selected: this.data.canteens[event.detail],
      show: false,
    })
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
