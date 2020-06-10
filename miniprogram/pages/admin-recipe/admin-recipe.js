import Dialog from '../../dist/dialog/dialog';
const db = wx.cloud.database()
const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    adminWindow:'',
    value: "",
    canteen: "全部",
    goods: []
  },

  onLoad: function() {
    //site译码
    var adminCode = app.globalData.user_info.site.substring(0, 7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var window = adminSite.windows[adminCode][j]
    this.setData({
      adminWindow: window.canteen + window.floor + window.name
    })
  },

  //删除菜品信息
  del_menu: function(e) {
    console.log(e)
    Dialog.confirm({
      title: '提示',
      message: '确认删除该菜品信息？',
    }).then(() => {
      //确认删除
      wx.cloud.callFunction({
        name: 'db_menu_command',
        data: {
          command: "del",
          data: e.currentTarget.dataset
        },
        success: function(res) {
          console.log(res)
        },
        fail: console.error
      })
    }).catch(err => {
      console.log(err);
    })
  },

  //售卖状态更改
  alter_status: function(e) {
    wx.showToast({
      title: '售卖状态更改',
      icon: 'none'
    })
  },


  onShow: function() {
    this.getData(res => {});
  },

  onPullDownRefresh: function() {
    this.setData({
      goods: []
    })
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  onReachBottom: function() {
    this.getData(res => {})
  },

  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection("Menu").skip(this.pageData.skip).get().then(res => {
      this.decodeWindow(res.data)
      let oldData = this.data.goods;
      this.setData({
        goods: oldData.concat(res.data)
      }, res => {
        this.pageData.skip = this.pageData.skip + 20;
        wx.hideLoading()
        callback();
      })
    })
  },
  
  decodeWindow: function (goods) {
    for (var i = 0; i < goods.length; i++) {
      var floorCode = goods[i].meal_window.substring(0, 7).concat('00')
      var j = parseInt(goods[i].meal_window.substring(7, 9)) - 1
      var window = adminSite.windows[floorCode][j]
      goods[i].meal_window = window.canteen + window.floor + window.name
    }
  },

  pageData: {
    skip: 0,
  },

  addMenu(e) {
    wx.navigateTo({
      url: "../recipe-modify/recipe-modify?_id=" + null, //此处传参用以区别是添加还是修改
    })
  }

})