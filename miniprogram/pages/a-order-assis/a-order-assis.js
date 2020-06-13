const app = getApp()
const db = wx.cloud.database()
const _ = db.command
var adminSite = require('../../utils/admin_site.js')
Page({
  data: {
    activeName1: '1',
    activeName2: '1',
    adminWindow: '',

    //时间表
    times: ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30'],
    //当日时间范围
    sdate: new Date(),
    edate: new Date(),
    orderList: [
      [],
      [],
      [],
      [],
      [],
      []
    ],

  },

  pageData: {
    orderList: [
      [],
      [],
      [],
      [],
      [],
      []
    ],
  },

  onLoad: function() {
    var that = this
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
    //获取数据并解析
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
    var times = this.data.times
    db.collection("User_orders")
      .where({
        submission_time: _.gte(that.data.sdate).and(_.lte(that.data.edate)),
        'meal_orders.meal_window': app.globalData.user_info.site
      })
      .limit(500)
      .orderBy('dilivery_time', 'asc')
      .orderBy('meal_orders[0]._id', 'asc')
      .get().then(res => {
        //console.log(res.data)
        for (var i in res.data) { //遍历该窗口的所有订单
          for (var j in times) { //遍历判断批次
            if (res.data[i].dilivery_time == times[j]) { //判断批次
              //如果没有该菜品就新加入
              if (i == 0 || res.data[i].meal_orders[0]._id != res.data[i - 1].meal_orders[0]._id || that.pageData.orderList[j].length == 0) {
                res.data[i].meal_orders[0].cnt = 1
                that.pageData.orderList[j].push(res.data[i].meal_orders[0])
              }
              //如果已有该菜品，cnt++
              else {
                that.pageData.orderList[j][that.pageData.orderList[j].length - 1].cnt++
              }
            }
          }
        }
        this.setData({
          orderList: that.pageData.orderList
        })
      })
  },
})