const app = getApp()
Page({
  data: {
    value: "",
    show: false,
    
  },
  
  onLoad(){
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        //console.log(res);
        that.setData({
          'user_info.nickName': res.userInfo.nickName,
          'user_info.avatarUrl': res.userInfo.avatarUrl,
        })
      }
    })
  },


  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
})

