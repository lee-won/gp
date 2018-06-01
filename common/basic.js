function handleStorage (method, sync=false, key, value, callback) {
  switch (method) {
    case 'set': {
      if(sync) {
        try {
          wx.setStorageSync(key, value)
        } catch (e) {
        }
      } else {
        wx.setStorage({
          key: key,
          data: value
        })
      }
      break;
    }
    case 'get': {
      if(sync) {
        try {
          var value = wx.getStorageSync(key)
          if (value) {
            // Do something with return value
          }
        } catch (e) {
          // Do something when catch error
        }
      } else {
        wx.getStorage({
          key: key,
          success: (res) => {
            callback(res.data)
          },
          fail: (res) => {
            callback(res.data)
          }
        })
      }
      break
    }
    case 'remove': {
      if(sync) {
        try {
          wx.removeStorageSync(key)
        } catch (e) {
          // Do something when catch error
        }
      } else {
        wx.removeStorage({
          key: key,
          success: function (res) {
            callback(res.data)
          }
        })
      }
      break
    }
    case 'clear': {
      if(sync) {
        try {
          wx.clearStorageSync()
        } catch (e) {
          // Do something when catch error
        }
      } else {
        wx.clearStorage()
      }
      break;
    }
    default: break
  }
}

module.exports = handleStorage