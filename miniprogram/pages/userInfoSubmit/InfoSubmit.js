import Dialog from '../../dist/dialog/dialog';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    columns: ['三公寓一号楼', '三公寓二号楼', '三公寓三号楼', '三公寓四号楼', '三公寓五号楼'],
    selectBuilding: '三公寓一号楼',
    show: false,
    flag: {
      sw_num_f: true,
      room_f: true,
      phone_f: true
    },

    building: '',
    room: '',

    user_info: {
      is_admin: true,
      name: '',
      openId: '',
      phone_num: '',
      site: '010030206',
      sw_num: ''
    }
  },

  onShow() {
    var that = this
    if (app.globalData.user_info.openId == null) {
      //获取登录用户openid
      wx.cloud.callFunction({
        name: 'getOpenid',
        success: function(res) {
          that.setData({
            'user_info.openId': res.result.openId
          })
        }
      })
    } else {
      that.setData({
        'user_info.openId': app.globalData.user_info.openId
      })
    }

    //获取用户的个人信息
    db.collection('User_info').where({
      openId: that.data.user_info.openId
    }).get().then(res => {
      if (res.data.length) {
        //登录用户信息赋值为全局变量
        app.globalData.user_info.is_admin = res.data[0].is_admin
        app.globalData.user_info.name = res.data[0].name
        app.globalData.user_info.openId = res.data[0].openId
        app.globalData.user_info.phone_num = res.data[0].phone_num
        app.globalData.user_info.site = res.data[0].site
        app.globalData.user_info.sw_num = res.data[0].sw_num

        that.setData({
          'user_info.is_admin': res.data[0].is_admin,
          'user_info.name': res.data[0].name,
          'user_info.openId': res.data[0].openId,
          'user_info.phone_num': res.data[0].phone_num,
          'user_info.site': res.data[0].site,
          'user_info.sw_num': res.data[0].sw_num
        })
        
        console.log(this.data.user_info)
      }

    })


  },

  picker_onChange(event) {
    this.setData({
        selectBuilding: event.detail.value
      }),
      wx.showToast({
        title: "当前选择：" + this.data.selectBuilding,
        icon: 'none'
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
  //学工号设置
  setNum(event) {
    if (event.detail.length != 10 || isNaN(event.detail)) {
      this.setData({
        'flag.sw_num_f': false
      })
    } else {
      this.setData({
        'flag.sw_num_f': true
      })
      this.setData({
        'user_info.sw_num': event.detail,
      })
    }

  },

  //姓名
  setName(event) {
    this.setData({
      'user_info.name': event.detail,
    })
  },

  //房间号
  setRoom(event) {
    if (event.detail.length != 4 || isNaN(event.detail)) {
      this.setData({
        'flag.room_f': false
      })
    } else {
      this.setData({
        'flag.room_f': true,
        room: event.detail,
      })
    }
  },
  //电话号码
  setPhone_num(event) {
    if (event.detail.length != 11 || isNaN(event.detail)) {
      this.setData({
        'flag.phone_f': false
      })
    } else {
      this.setData({
        'flag.phone_f': true,
        'user_info.phone_num': event.detail,
      })

    }
  },

  submit_info: function() {
    var that = this
    var f = this.data.flag
    var d = this.data.user_info
    if (d.sw_num.length == 0 || !f.sw_num_f || d.name == 0 || d.phone_num == 0 || !f.phone_f || this.data.room == 0 || !f.room_f) {
      wx.showToast({
        title: '请输入有效信息',
        icon: 'none'
      })
      return;
    }
    Dialog.confirm({
      title: '提示',
      message: '确认提交认证信息?',
    }).then(() => {
      db.collection('User_info').where({
        openId: app.globalData.user_info.openId
      }).get().then(res => {
        if (res.data.length != 0) { //数据库中找到了该用户的openId
          wx.cloud.callFunction({
            name: 'db_User_info',
            data: {
              command: 'update',
              data: that.data.user_info,
            }
          }).then(console.log)
          wx.showToast({
            title: '个人信息修改成功',
            icon: 'none'
          })
        } else { //数据库中没有找到改用户openId
          wx.cloud.callFunction({
            name: 'db_User_info',
            data: {
              command: 'add',
              data: that.data.user_info,
            }
          }).then(console.log)
        }
      })
    }).catch(() => {

    })

  }
})