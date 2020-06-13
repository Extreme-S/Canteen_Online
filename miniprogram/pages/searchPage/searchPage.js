const db = wx.cloud.database()
const app = getApp()
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    goods: []
  },

  onChange(e) {
    console.log(e.detail)
    db.collection('Menu')
      .where({
        meal_name:db.RegExp({
          regexp:e.detail,
          options:'i'
        })
      })
      .limit(500)
      .get()
      .then(res => {
        console.log(res.data)
        this.decodeWindow(res.data)
        this.setData({
          goods: res.data,
        })
      })
  },

  //译码
  decodeWindow: function(goods) {
    //console.log(goods)
    for (var i = 0; i < goods.length; i++) {
      var floorCode = goods[i].meal_window.substring(0, 7).concat('00')
      var j = parseInt(goods[i].meal_window.substring(7, 9)) - 1
      var window = adminSite.windows[floorCode][j]
      goods[i].meal_window = window.canteen + window.floor + window.name
      //console.log(goods)
    }
  },
})