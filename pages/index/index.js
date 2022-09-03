// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
    tempData: []
  },
  onLoad() {
    this.getMsg()
  },
  copyToboard(event) {
    const data = event.currentTarget.dataset.index
    wx.setClipboardData({
      data,
    })
  },
  needToShare(event) {
    console.log(event.detail);
    // 把需要添加到剪贴板的内容后端本地变量
    this.setData({
      msg: event.detail.value
    })
  },
  saveToServer() {
    wx.request({
      url: 'http://localhost:3000/set',
      method: 'GET',
      // 由于header部分不允许出现中文字符，所以做一次urlencode
      header: {
        content: encodeURIComponent(this.data.msg)
      },
      success: (result) => {
        console.log(result.data)
        this.setData({
          tempData: result.data.data,
          msg: ''
        })
      }
    })
  },
  clearMsg() {
    this.setData({
      msg: ''
    })
  },
  getMsg() {
    wx.request({
      url: 'http://localhost:3000/get',
      method: 'GET',
      header: {
        content: this.data.msg
      },
      success: (result) => {
        console.log(result.data)
        this.setData({
          tempData: result.data.data
        })
      }
    })
  }
})
