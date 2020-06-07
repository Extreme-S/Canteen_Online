const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    haveUserInfo: false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  //加载的时候，通过openid提取用户信息(要时间获取呀)
  onLoad: function(options) {

    var that = this;
    //通过openID提取用户信息
    db.collection('User_info').where({
      openId: app.globalData.user_info.openId
    }).get().then(res => {
      if (!res.data.length) {
        that.setData({
          haveUserInfo: false
        })
      } else {

        //登录用户信息赋值为全局变量（openid已有）
        app.globalData.user_info.is_admin = res.data[0].is_admin
        app.globalData.user_info.name = res.data[0].name
        app.globalData.user_info.phone_num = res.data[0].phone_num
        app.globalData.user_info.site = res.data[0].site
        app.globalData.user_info.sw_num = res.data[0].sw_num
        that.setData({
          haveUserInfo: true
        })
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息（头像，昵称）了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      console.log(app.globalData.user_info.openId);
      //console.log(that.data.haveUserInfo);
      //console.log(that.data.haveUserInfo === false);

      //没有用户信息（地址等）就填写
      if(that.data.haveUserInfo === false) {
        wx.redirectTo({
          url: '../userInfoSubmit/InfoSubmit',
        })
      }
      //如果有信息的话就直接返回。
      wx.switchTab({
        url: '../tab-order/order',
      })

     
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})