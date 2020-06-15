const db = wx.cloud.database()
const app = getApp()
Page({
  data: {},

  onShow: function(options) {
    //检测授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../authorization/authorization',
          })
          return ;
        }
      }
    })
    //从缓存中读取用户数据
    var json = wx.getStorageSync('userOtherInfo')
    console.log(json)
    //缓存命中
    if (json) {
      var obj = JSON.parse(json)
      app.globalData.user_info.name = obj.name
      app.globalData.user_info.phone_num = obj.phone_num
      app.globalData.user_info.site = obj.site
      app.globalData.user_info.sw_num = obj.sw_num
      app.globalData.user_info.openId = obj.openId
      this.judgeUrl()
    }
    //缓存读取信息失败
    else {
      var that = this
      wx.cloud.callFunction({
        name: 'getOpenid'
      }).then(res => {
        db.collection('User_info')
          .where({
            _openid: res.result.openId
          })
          .get()
          .then(res => {
            //数据库里找到了
            if (res.data.length) {
              console.log(res.data)
              app.globalData.user_info.name = res.data[0].name
              app.globalData.user_info.phone_num = res.data[0].phone_num
              app.globalData.user_info.site = res.data[0].site
              app.globalData.user_info.sw_num = res.data[0].sw_num
              app.globalData.user_info.openId = res.data[0]._openid
              try {
                wx.setStorageSync('userOtherInfo', JSON.stringify(app.globalData.user_info))
              } catch (e) {
                console.e
              }
              that.judgeUrl()
            }
            //数据库里没有找到,跳转到信息填写页面
            else {
              wx.redirectTo({
                url: '../userInfoSubmit/InfoSubmit',
              })
              return;
            }
          })
      })
    }
  },

  judgeUrl() {
    if (app.globalData.user_info.site.charAt(2) == '0') {
      wx.switchTab({
        url: '../tab-order/order',
      })
    } else {
      wx.redirectTo({
        url: '../admin/admin',
      })
    }
  }

  // onShow: function() {
  //   //console.log("现在执行onshow函数，")
  //   if (!this.data.haveUserInfo) {
  //     console.log("缓存中读取用户信息失败，开始从数据库中查询")
  //     wx.cloud.callFunction({
  //         name: 'getOpenid',
  //       })
  //       .then(res => {
  //         //console.log(res.result.openId)
  //         return db.collection('User_info').where({
  //           openId: res.result.openId
  //         }).get()
  //       })
  //       .then(res => {
  //         //console.log(res)
  //         if (res) {
  //           //console.log(res);
  //           if (!res.data.length) {
  //             //找不到
  //             console.log("进入授权页面")
  //             wx.redirectTo({
  //               url: '../userInfoSubmit/InfoSubmit',
  //             })
  //           }
  //           //如果找到了，那么登录用户信息赋值为全局变量
  //           //app.globalData.user_info.name = res.data[0].name
  //           app.globalData.user_info.phone_num = res.data[0].phone_num
  //           app.globalData.user_info.site = res.data[0].site
  //           app.globalData.user_info.sw_num = res.data[0].sw_num
  //           app.globalData.user_info.openId = res.data[0].openId
  //           try {
  //             var str = {
  //               "name": app.globalData.user_info.name,
  //               "sw_num": app.globalData.user_info.sw_num,
  //               "site": app.globalData.user_info.site,
  //               "phone": app.globalData.user_info.phone_num,
  //               "openId": app.globalData.user_info.openId
  //             }
  //             //console.log(str)
  //             //写入缓存
  //             wx.setStorageSync('userOtherInfo', JSON.stringify(str))

  //           } catch (e) {
  //             //console.log("写入缓存失败")
  //           }
  //         }
  //       })
  //   } else {
  //     //console.log("用户信息缓存命中，直接进入判断")
  //   }
  //   var regSite = /^(\d{2})1(\d{2})(\d{2})(\d{2})$/
  //   //console.log(regSite.test(user_site))
  //   //console.log(app.globalData.user_info.site)
  //   if (regSite.test(app.globalData.user_info.site)) {
  //     wx.redirectTo({
  //       url: '../admin/admin',
  //     })
  //   } else {
  //     wx.switchTab({
  //       url: '../tab-order/order',
  //     })
  //   }
  //   //console.log("onshow函数执行完毕")
  // }

})