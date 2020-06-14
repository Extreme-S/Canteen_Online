import Dialog from '../../dist/dialog/dialog';
const db = wx.cloud.database();
const app = getApp();
const Menu = db.collection('Menu');
const _ = db.command;
Page({
  data: {
    good: {},
    _id: null
  },

  //选择图片
  selectImage: function() {
    var pagethis = this;
    wx.chooseImage({
      success: function(res) {
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          pagethis.setData({
            'good.meal_img': res.fileID
          })
        }).catch(err => {
          console.error(err)
        })
      },
    })
  },

  //页面加载
  onLoad: function(options) {
    this.setData({
      _id: (options._id == 'null' ? null : options._id)
    })
    if (options._id != 'null') {
      Menu.doc(options._id).get().then(res => {
        this.setData({
          good: res.data
        })
      })
    }
  },

  //表单提交
  onSubmit: function(event) {
    if (!event.detail.value.meal_name || !event.detail.value.meal_price) {
      wx.showToast({
        title: '请填入必要信息',
        icon: "loading"
      })
      return;
    }
    Dialog.confirm({
        title: '提示',
        message: '确认添加或修改菜品信息？',
      })
      .then(() => {
        this.setData({
          'good.meal_img': this.data.good.meal_img,
          'good.meal_name': event.detail.value.meal_name,
          'good.meal_info': event.detail.value.meal_info,
          'good.meal_price': event.detail.value.meal_price,
          'good.meal_window':app.globalData.user_info.site
        })
        //console.log(this.data.good)
        //数据更新
        if (this.data._id != null) {
          wx.cloud.callFunction({
            name: 'db_menu_command',
            data: {
              command: "update",
              data: this.data.good
            },
            success: function(res) {
              console.log(res)
            },
            fail: console.error
          })
        }
        //数据添加
        if (this.data._id == null) {
          wx.cloud.callFunction({
            name: 'db_menu_command',
            data: {
              command: "add",
              data: this.data.good
            },
            success: function(res) {
              console.log(res)
            },
            fail: console.error
          })
        }

        //退回上一界面
        wx.navigateBack({}).then(() => {
          wx.showToast({
            title: '修改成功',
            icon: "success"
          })
        })
      })
      .catch(() => {
        // on cancel
      });
  },


})