// index.js
// 获取应用实例
// const app = getApp()

Page({
  data: {
    isAgree: true,
    msg: '',
    needToTransfor: {
      msg: '爱'
    },
    tempData: []
  },
  submitForm() {
    wx.checkSession({
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
    // if (wx.getStorageSync('token')) {
    //   return;
    // }
    wx.login(
      {
        success: (res) => {
          console.log(res)
          console.log('test', res.code)
          // 发起请求
          // wx.request({
          //   url: `http://localhost:3001/auth?code=${res.code}`,
          //   success: (res) => {
          //     wx.setStorageSync('token', res.data.token)
          //     console.log('微信', res.data.token)
          //   }
          // })
          this.wxRequstPromise('http://localhost:3001/auth?code=${res.code}').then((res) => {
            console.log(res)
          })
        }
      }
    )
  },
  // 异步逻辑转promise的模板代码
  wxRequstPromise(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        success: (res) => {resolve(res)},
        fail: (error) => {reject(error)}
      })
    })
  },
  onLoad() {
    console.log('test', this.data.needToTransfor)
    this.getMsg()
    // 页面栈
    const pageStack = getCurrentPages();
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
        this.setData({
          tempData: result.data.data
        })
      }
    })
  }
})
