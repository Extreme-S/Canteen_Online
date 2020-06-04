Page({
  data: {
    user_info: {
      openId: null,
      avatarUrl: null,
      nickName: '点击登录'
    }
  },

  //生命周期函数--监听页面显示
  onShow() {
    var pagethis = this;
    //底部导航栏分模块加载
    this.getTabBar().init();
    //获取登录用户信息
    wx.getUserInfo({
      success: function(res) {
        //console.log(res);
        pagethis.setData({
          'user_info.nickName': res.userInfo.nickName,
          'user_info.avatarUrl': res.userInfo.avatarUrl,
        })
      }
    })
   
  },

})