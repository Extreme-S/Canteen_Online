import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()

const time = {
  '中午': ['11:30', '12:00', '12:30'],
  '下午': ['17:30', '18:00', '18:30'],
};

Page({
  data: {
    columns: [{
        values: Object.keys(time), 
        className: 'column1',
      },
      {
        values: time['中午'],
        className: 'column2',
        defaultIndex: 0,
      },
    ],

    show: false,
    good: {},
    user_order: {
      user_info: {}, //用户信息
      meal_id: '', //菜品id
      submission_time: '', //提交时间
      dilivery_time: '11:30' //配送时间
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

  pickerOnChange(event) {
    const {picker,value,index} = event.detail;
    picker.setColumnValues(1, time[value[0]]);
    //console.log(picker.getValues())
    this.setData({
      'user_order.dilivery_time': picker.getColumnValue(1)
    })
  },

  onSubmit() {
    var that = this
    Dialog.confirm({
        title: '订单信息确认',
        message: `菜品名:${that.data.good.meal_name}\n预计送达时间：${that.data.user_order.dilivery_time}\n价格：${that.data.good.meal_price}`,
        messageAlign: "left",
      })
      .then(() => {
        that.setData({
          'user_order.submission_time': new Date(),
        })
        db.collection('User_orders').add({
          data: that.data.user_order,
          success:function(res){
            Toast.success('订单确认')
            wx.switchTab({
              url: '../tab-orders/orders',
            })
          },
          fail:console.error
        })
      })
      .catch(() => {
        // on cancel
      });
  }

})