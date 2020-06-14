import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
var stuSite = require('../../utils/stu_site.js')
// var time = {
//   '中午': [{ text: '11:30', disabled: false }, { text: '12:00', disabled: false }, { text: '12:30', disabled: false }],
//   '下午': [{ text: '17:30', disabled: false }, { text: '18:00', disabled: false }, { text: '18:30', disabled: false },],
// };
var time = {
  '中午': ['11:30', '12:00', '12:30'],
  '下午': ['17:30', '18:00', '18:30'],
};

Page({
  data: {
    price:'',
    columns: [{
        values: [''],
        className: 'colum0'
      },
      {
        values: Object.keys(time),
        className: 'column1',
      },
      {
        values: time['中午'],
        className: 'column2',
      },
    ],
    selecet_value: [0, 0, 0],
    show: false,
    good: {},
    address_info: '',
    user_order: {
      user_info: {}, //用户信息
      meal_orders: [], //菜品订单
      submission_time: new Date(), //提交时间
      dilivery_time: '11:30' //配送时间
    }
  },

  //监听页面加载
  onLoad: function(options) {
    var that = this
    var date = new Date().toLocaleDateString()
    //site译码
    var stuCode = app.globalData.user_info.site.substring(0, 7).concat('00')
    var j = parseInt(app.globalData.user_info.site.substring(7, 9)) - 1
    var room = stuSite.rooms[stuCode][j]
    //数据库查询该菜品
    db.collection('Menu')
      .doc(options._id)
      .get()
      .then(res => {
        this.setData({
          address_info: room.dorm + room.floor + room.name,
          good: res.data,
          'columns[0].values[0]': date,
          'user_order.user_info': app.globalData.user_info, //初始化订单中用户信息
          'user_order.meal_orders': that.data.user_order.meal_orders.concat(res.data) //初始化订单信息meal_orders
        })
        this.setData({
          price: parseInt(this.data.good.meal_price * 100)
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
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(2, time[value[1]]);
    this.setData({
      'user_order.dilivery_time': picker.getColumnValue(2)
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
          success: function(res) {
            Toast.success('订单确认')
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