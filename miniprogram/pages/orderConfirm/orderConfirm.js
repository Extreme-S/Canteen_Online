import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    show: false,
    good: {}
  },

  //监听页面加载
  onLoad: function(options) {
    db.collection('Menu').doc(options._id).get().then(res => {
      //console.log(res)
      this.setData({
        good:res.data,
      })
      console.log(this.data.good)
      
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
    Dialog.confirm({
        title: '订单信息确认',
        message: '菜品名:\n预计送达时间：\n价格：',
        messageAlign: "left",
      })
      .then(() => {
        Toast.success("订单确认，跳转到订单页面");
      })
      .catch(() => {
        // on cancel
      });
  }

})