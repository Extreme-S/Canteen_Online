const app = getApp()
Page({
  data: {
    activeName1: '1',
    activeName2: '1',

    ordersOfAdmin:{
      orders_noon_1:[],
      orders_noon_2: [],
      orders_noon_3: [],
      orders_pm_1: [],
      orders_pm_2: [],
      orders_pm_3: [],
    }
  },
  onChange1(event) {
    this.setData({
      activeName1: event.detail,
    })
  },
  onChange2(event) {
    this.setData({
      activeName2: event.detail,
    })
  },
})