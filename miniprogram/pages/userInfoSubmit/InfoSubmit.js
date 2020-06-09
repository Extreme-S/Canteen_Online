import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
var address = require('../../utils/user_site.js')
Page({
  data: {
    show: false,

    flag: {
      sw_num_f: true,
      room_f: true,
      phone_f: true
    },

    stuHide: false,
    adminHide: true,

    value: [0, 0, 0],
    user_address: {
      schools: [], //学校
      departments: [], //部门 （对学生而言，部门是寝室楼，如三公寓；对管理员来说，部门是食堂，如一食堂）
      floors: [], //楼层
      numbers: [] //号码 （对学生而言，是房间号；对管理者而言是窗口号码）
    },

    user_info: {
      is_admin: true,
      name: '',
      openId: '',
      phone_num: '',
      site: '',
      sw_num: ''
    }
  },

  change_to_admin:function(event){
    this.setData({
      stuHide: true,
      adminHide: false,
    });
  },

  change_to_stu:function(event){
    this.setData({
      stuHide: false,
      adminHide: true,
    });
  },
  
  onLoad: function(event) {
    var school_id = address.schools[0].id
    //console.log(address.floors[address.departments[school_id][0].id])
    //console.log(address.numbers[address.floors[address.departments[school_id][0].id][0].id])
    this.setData({
      'user_address.departments': address.departments[school_id],
      'user_address.floors': address.floors[address.departments[school_id][0].id],
      'user_address.numbers': address.numbers[address.floors[address.departments[school_id][0].id][0].id],
      'user_info.site': address.numbers[address.floors[address.departments[school_id][0].id][0].id][0].id
    })
    console.log(this.data.user_info)
  },

  addressOnChange: function(e) {
    //console.log(e)
    var value = e.detail.value
    var departments = this.data.user_address.departments
    var floors = this.data.user_address.floors
    var numbers = this.data.user_address.numbers
    var select_department = value[0]
    var select_floor = value[1]
    var select_number = value[2]

    // 如果楼栋选择项和之前不一样，表示滑动了栏1，此时楼层默认是楼栋的第一组数据，
    if (this.data.value[0] != select_department) {
      var department_id = address.departments[address.schools[0].id][select_department].id

      this.setData({
        value: [select_department, 0, 0],
        'user_address.floors': address.floors[department_id],
        'user_address.numbers': address.numbers[address.floors[department_id][0].id],
      })
    } else if (this.data.value[1] != select_floor) {
      // 滑动选择了第二项数据，
      var floor_id = floors[select_floor].id
      this.setData({
        value: [select_department, select_floor, 0],
        'user_address.numbers': address.numbers[floors[select_floor].id],
      })
    } else {
      // 滑动选择了第三项
      this.setData({
        value: [select_department, select_floor, select_number]
      })
    }
    //console.log(this.data.value)
    this.setData({
      'user_info.site': this.data.user_address.numbers[select_number].id
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
          is_admin: that.data.user_info.is_admin,
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
