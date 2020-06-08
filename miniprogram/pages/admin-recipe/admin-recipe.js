import Dialog from '../../dist/dialog/dialog';
const db = wx.cloud.database()
Page({
  data: {
    value: "",
    canteen: "全部",
    goods: []
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
        success: function(res) {
          console.log(res)
        },
        fail: console.error
      })
    }).catch(err => {
      console.log(err);
    })
  },

  //售卖状态更改
  alter_status: function(e) {
    wx.showToast({
      title: '售卖状态更改',
      icon: 'none'
    })
  },


  onShow: function() {
    this.getData(res => {});
  },

  onPullDownRefresh: function() {
    this.setData({
      goods:[]
    })
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();
    })
  },

  onReachBottom:function(){
    this.getData(res=>{})
  },

  getData: function(callback) {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection("Menu").skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.goods;
      this.setData({
        goods: oldData.concat(res.data)
      }, res => {
        this.pageData.skip = this.pageData.skip +20;
        wx.hideLoading()
        callback();
      })
    })
  },

  pageData: {
    skip: 0,
  },

  addMenu(e) {
    wx.navigateTo({
      url: "../recipe-modify/recipe-modify?_id=" + null, //此处传参用以区别是添加还是修改
    })
  }

})