const db = wx.cloud.database()
const app = getApp()
var adminSite = require('../../utils/admin_site.js')
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

  onLoad: function() {
    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    console.log(date)
    console.log(date.toLocaleString())
    var that = this;
    //if(app.globalData.user_info.openId == null) {
    wx.cloud.callFunction({
      name: 'getOpenid',
    }).then(res => {

      //调用成功，获得openid
      app.globalData.user_info.openId = res.result.openId;
      //console.log(app.globalData.user_info.openId);

      //检测是否授权
      wx.getSetting({
        complete: (res) => {
          //如果未授权，那么转到授权页面
          if (!res.authSetting['scope.userInfo']) {
            wx.redirectTo({
              url: '../authorization/authorization',
            })
          }
        },
      })
    }).then(res => {
      if (app.globalData.user_info.site == null) {
        db.collection('User_info').where({
          openId: app.globalData.user_info.openId
        }).get().then(res => {
          //console.log(res);
          //如果找不到，那么定位到信息填写页面
          if (!res.data.length) {
            wx.redirectTo({
              url: '../userInfoSubmit/InfoSubmit',
            })
            return
          }
          //如果找到了，那么登录用户信息赋值为全局变量
          app.globalData.user_info.is_admin = res.data[0].is_admin
          app.globalData.user_info.name = res.data[0].name
          app.globalData.user_info.phone_num = res.data[0].phone_num
          app.globalData.user_info.site = res.data[0].site
          app.globalData.user_info.sw_num = res.data[0].sw_num
        })
      }
    }).catch(err => {
      console.log(err);
    })

    //}

    //有openid了，不取，那么如果用户id是空的

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

/*
    //检测是否授权
    wx.getSetting({
      complete: (res) => {
        //如果未授权，那么转到授权页面
        if (!res.authSetting['scope.userInfo']){
          wx.redirectTo({
            //没有用户信息，也没有openid
            url: '../authorization/authorization',
          })
        }
      },
    })

    //已授权，检测openID，如果没有openid，那么获得openid
    if(app.globalData.user_info.openId == null) {
      wx.cloud.callFunction({
        name: 'getOpenid',
      }).then(res => {

        //调用成功，获得openid
        app.globalData.user_info.openId = res.result.openId;
        console.log(app.globalData.user_info.openId);
        //获得openid后，如果用户信息是空的，那么获取用户信息
        if(app.globalData.user_info.site == null){
          db.collection('User_info').where({
            openId: app.globalData.user_info.openId
          }).get().then(res => {
            console.log(res);
            //如果找不到，那么定位到信息填写页面
            if (!res.data.length) {
              wx.redirectTo({
                url: '../userInfoSubmit/InfoSubmit',
              })
               return
            }
            //如果找到了，那么登录用户信息赋值为全局变量
            app.globalData.user_info.is_admin = res.data[0].is_admin
            app.globalData.user_info.name = res.data[0].name
            app.globalData.user_info.phone_num = res.data[0].phone_num
            app.globalData.user_info.site = res.data[0].site
            app.globalData.user_info.sw_num = res.data[0].sw_num
          })
        }
      }).catch(err => {
        console.log(err);
      })*/