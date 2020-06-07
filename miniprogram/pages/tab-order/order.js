const db = wx.cloud.database()
const app = getApp()

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
      goods:[],
    })
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  onReachBottom: function () {
    this.getData(res=>{});
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        // 如果用户已经授权过
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //获取登录用户openid
              wx.cloud.callFunction({
                name: 'getOpenid',
                success: function(res) {
                  that.setData({
                    'user_info.openId': res.result.openId
                  })
                  //获取用户的个人信息
                  db.collection('User_info').where({
                    openId: that.data.user_info.openId
                  }).get().then(res => {
                    if (!res.data.length) {
                      wx.redirectTo({
                        url: '../userInfoSubmit/InfoSubmit',
                      })
                      return
                    }
                    //登录用户信息赋值为全局变量
                    app.globalData.user_info.is_admin = res.data[0].is_admin
                    app.globalData.user_info.name = res.data[0].name
                    app.globalData.user_info.openId = res.data[0].openId
                    app.globalData.user_info.phone_num = res.data[0].phone_num
                    app.globalData.user_info.site = res.data[0].site
                    app.globalData.user_info.sw_num = res.data[0].sw_num
                  })
                }
              })
            }
          });
        } else { // 用户没有授权
          wx.redirectTo({
            url: '../authorization/authorization',
          })
        }
      }
    });
  },

  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('Menu').skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.goods;
      this.setData({
        goods: oldData.concat(res.data),
      }, res => {
        this.pageData.skip = this.pageData.skip +20;
        wx.hideLoading()
        callback();
      })
    })
  },

  pageData:{
    skip:0,
  }
})