const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    value: "",
    adminWindow:'',
    notice2: [{}],
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

  
})

