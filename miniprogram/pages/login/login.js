const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中读取用户数据
    console.log("现在开始执行onload函数")
    console.log("尝试从缓存中读取用户信息")
    try {
      var json = wx.getStorageSync('userOtherInfo')
      //缓存命中，直接结束
      if (json) {
        var obj = JSON.parse(json)
        app.globalData.user_info.name = obj.name
        app.globalData.user_info.phone_num = obj.phone
        app.globalData.user_info.site = obj.site
        app.globalData.user_info.sw_num = obj.sw_num
        app.globalData.user_info.openId = obj.openId
        console.log("用户信息缓存命中,设置标志为true")
        this.setData({
          haveUserInfo: true
        })
      }
    } catch (e) {
      console.log("e")
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("现在执行onshow函数，")
    if(!this.data.haveUserInfo){
      console.log("缓存中读取用户信息失败，开始从数据库中查询")
      wx.cloud.callFunction({
        name: 'getOpenid',
      })
      .then(res => {
        console.log(res.result.openId)
        return db.collection('User_info').where({
          openId: res.result.openId
        }).get()
      })
      .then(res => {
        console.log(res)
        if(res) {
          console.log(res);
          if (!res.data.length) {
            //找不到
            console.log("进入授权页面")
            wx.redirectTo({
              url: '../userInfoSubmit/InfoSubmit',
            })
          }
          //如果找到了，那么登录用户信息赋值为全局变量
          app.globalData.user_info.name = res.data[0].name
          app.globalData.user_info.phone_num = res.data[0].phone_num
          app.globalData.user_info.site = res.data[0].site
          app.globalData.user_info.sw_num = res.data[0].sw_num
          app.globalData.user_info.openId = res.data[0].openId
          try {
            var str = {
            "name":app.globalData.user_info.name, "sw_num":app.globalData.user_info.sw_num,
            "site":app.globalData.user_info.site, "phone":app.globalData.user_info.phone_num,
            "openId":app.globalData.user_info.openId
            }
            console.log(str)
            //写入缓存
            wx.setStorageSync('userOtherInfo',  JSON.stringify(str) )
            
          } catch (e) { 
            console.log("写入缓存失败")
          }
        }
      })
    } else {
      console.log("用户信息缓存命中，直接进入判断")
    }
    var regSite =  /^(\d{2})1(\d{2})(\d{2})(\d{2})$/
    //console.log(regSite.test(user_site))
    //console.log(app.globalData.user_info.site)
    if (regSite.test(app.globalData.user_info.site)){
      wx.redirectTo({
        url: '../admin/admin',
      })
    } else {
      wx.switchTab({
        url: '../tab-order/order',
      })
    }
    console.log("onshow函数执行完毕")
  }
 
})
