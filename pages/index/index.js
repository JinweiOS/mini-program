// index.js
// 获取应用实例
// const app = getApp()

Page({
  data: {
    msg: '',
    needToTransfor: {
      msg: '爱'
    },
    tempData: []
  },
  onLoad() {
    this.getMsg()
    // 页面栈
    const pageStack = getCurrentPages();
    console.log('pageStack', pageStack)
  },
  copyToboard(event) {
    const data = event.currentTarget.dataset.index
    wx.setClipboardData({
      data,
    })
  },
  navigatorToHello() {
    wx.navigateTo({
      url: `/pages/hello/hello?name=${JSON.stringify(this.data.needToTransfor)}`,
      success: (res) => {
        res.eventChannel.emit('EVENT_HELLO', this.data.needToTransfor)
      }
    })
  },
  navigatorTo() {
    // url中任然不支持中文
    const sequelise = JSON.stringify('ppp')
    wx.navigateTo({
      url: `/pages/form/form?params=${sequelise}`,
      success: (res) => {
        res.eventChannel.emit('event_data', this.data.tempData)
      }
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
