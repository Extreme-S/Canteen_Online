import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
var address = require('../../utils/stu_site.js')
var adminAddress = require('../../utils/admin_site.js')
Page({
  data: {
    show: false,

    flag: {
      sw_num_f: true,
      phone_f: true
    },

    stuHide: false,
    adminHide: true,

    value: [0, 0, 0],


    //学生地址列表
    stu_address: {
      schools: [],
      dorms: [],
      floors: [],
      rooms: []
    },

    //管理员地址列表
    adm_address: {
      schools: [],
      canteens: [],
      floors: [],
      windows: []
    },


    user_info: {
      name: '',
      openId: '',
      phone_num: '',
      site: '',
      sw_num: ''
    }
  },

  change_to_admin: function(event) {
    var school_id = address.schools[0].id
    this.setData({
      stuHide: true,
      adminHide: false,
      'user_info.site': adminAddress.windows[adminAddress.floors[adminAddress.canteens[school_id][0].id][0].id][0].id,
      value: [0, 0, 0]
    });
  },

  change_to_stu: function(event) {
    var school_id = address.schools[0].id
    this.setData({
      stuHide: false,
      adminHide: true,
      'user_info.site': address.rooms[address.floors[address.dorms[school_id][0].id][0].id][0].id,
      value: [0, 0, 0]
    });
  },

  onLoad: function(event) {
    var school_id = address.schools[0].id
    var cschool_id = adminAddress.schools[0].id
    this.setData({
      'stu_address.dorms': address.dorms[school_id],
      'stu_address.floors': address.floors[address.dorms[school_id][0].id],
      'stu_address.rooms': address.rooms[address.floors[address.dorms[school_id][0].id][0].id],
      'user_info.site': address.rooms[address.floors[address.dorms[school_id][0].id][0].id][0].id, //默认学生信息填写界面

      'adm_address.canteens': adminAddress.canteens[cschool_id],
      'adm_address.floors': adminAddress.floors[adminAddress.canteens[cschool_id][0].id],
      'adm_address.windows': adminAddress.windows[adminAddress.floors[adminAddress.canteens[cschool_id][0].id][0].id],
    })
    console.log(this.data.stu_address)
  },

  //学生地址信息选择器事件
  stuAddressOnChange: function(e) {
    //console.log(e)
    var value = e.detail.value
    var dorms = this.data.stu_address.dorms
    var floors = this.data.stu_address.floors
    var rooms = this.data.stu_address.rooms
    var select_dorm = value[0]
    var select_floor = value[1]
    var select_room = value[2]

    // 如果楼栋选择项和之前不一样，表示滑动了栏1，此时楼层默认是楼栋的第一组数据，
    if (this.data.value[0] != select_dorm) {
      var dorm_id = address.dorms[address.schools[0].id][select_dorm].id
      this.setData({
        value: [select_dorm, 0, 0],
        'stu_address.floors': address.floors[dorm_id],
        'stu_address.rooms': address.rooms[address.floors[dorm_id][0].id],
      })
    } else if (this.data.value[1] != select_floor) {
      // 滑动选择了第二项数据，
      var floor_id = floors[select_floor].id
      this.setData({
        value: [select_dorm, select_floor, 0],
        'stu_address.rooms': address.rooms[floors[select_floor].id],
      })
    } else {
      // 滑动选择了第三项
      this.setData({
        value: [select_dorm, select_floor, select_room]
      })
    }
    this.setData({
      'user_info.site': this.data.stu_address.rooms[select_room].id,
    })
  },

  //管理员地址选择器事件
  adminAddressOnChange: function(e) {
    var value = e.detail.value
    var canteens = this.data.adm_address.canteens
    var floors = this.data.adm_address.floors
    var windows = this.data.adm_address.windows
    var select_canteen = value[0]
    var select_floor = value[1]
    var select_window = value[2]

    // 如果楼栋选择项和之前不一样，表示滑动了栏1，此时楼层默认是楼栋的第一组数据，
    if (this.data.value[0] != select_canteen) {
      var canteen_id = adminAddress.canteens[adminAddress.schools[0].id][select_canteen].id
      this.setData({
        value: [select_canteen, 0, 0],
        'adm_address.floors': adminAddress.floors[canteen_id],
        'adm_address.windows': adminAddress.windows[adminAddress.floors[canteen_id][0].id],
      })
    } else if (this.data.value[1] != select_floor) {
      // 滑动选择了第二项数据，
      var floor_id = floors[select_floor].id
      this.setData({
        value: [select_canteen, select_floor, 0],
        'adm_address.windows': adminAddress.windows[floors[select_floor].id],
      })
    } else {
      // 滑动选择了第三项
      this.setData({
        value: [select_canteen, select_floor, select_window]
      })
    }
    this.setData({
      'user_info.site': this.data.adm_address.windows[select_window].id,
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
      db.collection('User_info').add({
        data: {
          name: that.data.user_info.name,
          openId: app.globalData.user_info.openId,
          phone_num: that.data.user_info.phone_num,
          site: that.data.user_info.site,
          sw_num: that.data.user_info.sw_num
        },
        success: function() {
          Toast({
            type: 'success',
            message: '提交成功',
            onClose: () => {
              wx.switchTab({
                url: '../tab-my/my',
              })
            },
          });
        }
      })
    }).catch(() => {})
  }
})