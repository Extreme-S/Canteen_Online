const app = getApp()
Page({
  data: {
    activeName1: '1',
    row: [{}],
    activeName2: '1',
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