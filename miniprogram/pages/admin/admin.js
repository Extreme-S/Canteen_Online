const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    value: "",
    show: false,
    adminWindow:'',
    user_info:{}
  },

  onLoad:function(){
    var that = this;
    this.setData({
      user_info:app.globalData.user_info
    })
    //判断授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../authorization/authorization',
          })
        }
      }
    })
    //site译码
    console.log(this.data.user_info)
    var adminCode = this.data.user_info.site.substring(0, 7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var window = adminSite.windows[adminCode][j]
    this.setData({
     'adminWindow': window.canteen + window.floor + window.name
    })
    //获取信息
    wx.getUserInfo({
      success: function (res) {
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
