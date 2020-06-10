const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    value: "",
    show: false,
    adminWindow:'',
  },

  onLoad:function(){
    //site译码
    var adminCode = app.globalData.user_info.site.substring(0,7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var window = adminSite.windows[adminCode][j]
    this.setData({
      adminWindow: window.canteen + window.floor + window.name
    })

  },


  onLoad(){
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        //console.log(res);
        that.setData({
          'user_info.nickName': res.userInfo.nickName,
          'user_info.avatarUrl': res.userInfo.avatarUrl,
        })
      }
    })
  },


  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
})
