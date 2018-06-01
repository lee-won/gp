const ERR_OK = 0
function fetch(url, method, data, callback) {
  wx.request({
    url: url,
    method: method,
    data: data,
    success: (res) => {
      if (res.data.code === ERR_OK) {
        callback(res.data)
      } else {
        callback(res.data)
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    },
    fail: (res) => {
      return
    }
  })
}
module.exports = fetch