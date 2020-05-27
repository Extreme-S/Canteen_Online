import Dialog from '../../dist/dialog/dialog';
const db = wx.cloud.database()
Page({
  data: {
    value: "",
    canteen: "全部",
    goods: {}
  },
  //删除菜品信息
  del_menu: function(e) {
    console.log(e)
    Dialog.confirm({
      title: '提示',
      message: '确认删除该菜品信息？',
    }).then(() => {
      //确认删除
      wx.cloud.callFunction({
        name: 'db_menu_command',
        data: {
          command: "del",
          data: e.currentTarget.dataset
        },
        success: function (res) {
          console.log(res)
        },
        fail: console.error
      })
    })
  },
  
  //售卖状态更改
  alter_status: function(e){
    console.log(e)
    console.log("售卖状态更改")
  },

  onShow: function() {
    db.collection("Menu").get().then(res => {
      this.setData({
        goods: res.data
      })
    })
  },

  addMenu(e) {
    wx.navigateTo({
      url: "../recipe-modify/recipe-modify?_id=" + null, //此处传参用以区别是添加还是修改
    })
  }

})