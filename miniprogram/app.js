//app.js
App({
  globalData: {
    user_info: {//order页面加载时被初始化
      is_admin: true,
      name: null,
      openId: null,
      phone_num: null,
      site: null,
      sw_num: null
    }
  },

  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'test-iqvto',
      })
    }
  }

})