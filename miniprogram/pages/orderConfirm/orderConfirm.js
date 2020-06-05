import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
import util from '../../utils/util';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    show: false,
    good: {},
    user_order: {
      user_info: {}, //用户信息
      meal_id: '', //菜品id
      submission_time: '', //提交时间
      dilivery_time: '中午11：30' //配送时间
    }
  },

  //监听页面加载
  onLoad: function(options) {
    var that = this
    //console.log(util.formatTime(new Date()))
    db.collection('Menu').doc(options._id).get().then(res => {
      this.setData({
        good: res.data,
        'user_order.user_info': app.globalData.user_info, //初始化订单中用户信息
        'user_order.meal_id': res.data._id //初始化订单中meal_id
      })
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

  onSubmit() {
    var that = this
    Dialog.confirm({
        title: '订单信息确认',
        message: `菜品名:${that.data.good.meal_name}\n预计送达时间：${that.data.user_order.dilivery_time}\n价格：${that.data.good.meal_price}`,
        messageAlign: "left",
      })
      .then(() => {
        Toast.success("订单确认");
        that.setData({
          'user_order.submission_time': util.formatTime(new Date()),
        })
        console.log(that.data.user_order)
        wx.cloud.callFunction({
          name: 'db_User_orders',
          data: {
            command: "add",
            data: that.data.user_order
          },
          success: function (res) {
            console.log(res)
            wx.switchTab({
              url: '../tab-orders/orders',
            })
          },
          fail: console.error
        })
      })
      .catch(() => {
        // on cancel
      });
  }

})