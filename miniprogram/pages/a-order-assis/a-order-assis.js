const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    activeName1: '1',
    activeName2: '1',
    adminWindow: '',

    //当日时间范围
    sdate: new Date(),
    edate: new Date(),

    ordersOfAdmin: {
      orders_noon_1: [],
      orders_noon_2: [],
      orders_noon_3: [],
      orders_pm_1: [],
      orders_pm_2: [],
      orders_pm_3: [],
    }
  },

  onLoad: function() {
    //初始化当日时间范围
    var sdate = new Date()
    sdate.setHours(0)
    sdate.setMinutes(0)
    sdate.setSeconds(0)
    var edate = new Date()
    edate.setHours(23)
    edate.setMinutes(59)
    edate.setSeconds(59)
    this.setData({
      sdate: sdate,
      edate: edate
    })
    //site译码
    var adminCode = app.globalData.user_info.site.substring(0, 7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var window = adminSite.windows[adminCode][j]
    this.setData({
      adminWindow: window.canteen + window.floor + window.name
    })
    this.getData()
  },

  onChange1(event) {
    this.setData({
      activeName1: event.detail,
    })
  },

  onChange2(event) {
    this.setData({
      activeName2: event.detail,
    })
  },

  getData: function(callback) {
    var that = this
    wx.cloud.callFunction({
      name: 'aggregate_query',
      data: {
        collection:'User_orders',
        from:'Menu',
        localField:'meal_id',
        foreignField:'_id',
        as:'menu_info'
      },
      success: function(res) {
        console.log(res.result.list)
      },
      fail: console.error
    })

    // db.collection('User_orders').aggregate()
    //   .lookup({
    //     from: 'Menu',
    //     localField: 'meal_id',
    //     foreignField: '_id',
    //     as: 'menu_info',
    //   })
    //   .end()
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err))

    //   db.collection("User_orders")
    //     .where({
    //       submission_time: _.gte(that.data.sdate).and(_.lte(that.data.edate))
    //     })
    //     .limit(500)
    //     .orderBy('dilivery_time', 'asc')
    //     .orderBy('meal_id', 'asc')
    //     .get().then(res => {
    //       console.log(res)
    //     })
  },
})