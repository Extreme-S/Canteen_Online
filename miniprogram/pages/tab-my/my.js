const app = getApp()
const db = wx.cloud.database()
var stuSite = require('../../utils/stu_site.js')
Page({
  data: {
    stu_address: '',
    user_info: {
      avatarUrl: null,
      nickName: '点击登录'
    }
  },

  //生命周期函数--监听页面显示
  onLoad() {
    //底部导航栏分模块加载
    this.getTabBar().init();
    var that = this
    //site译码
    var stuCode = app.globalData.user_info.site.substring(0, 7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var room = stuSite.rooms[stuCode][j]
    //获取登录用户信息
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          stu_address: room.dorm + room.floor + room.name,
          'user_info.nickName': res.userInfo.nickName,
          'user_info.avatarUrl': res.userInfo.avatarUrl,
        })
      }
    })



  },

})