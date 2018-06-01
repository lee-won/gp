 //index.js
//获取应用实例
const app = getApp()
const Fetch = require('../../common/fetch.js')
const URL = require('../../common/url_config.js')
var startX = 0
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    images: [],
    tags: [],
    searchImages: [],
    searchValue: '',
    page:1,
    searchPage: 1,
    loadFlag:false,
    animationData1: {},
    animationData2: {},
    layerHide: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    setTimeout(()=>{
      Fetch(URL.LIST_URL + this.data.page + '/' + app.globalData.token + '/', 'get', null, (res) => {
        this.setData({
          images: res.data,
          tags: res.tags
        })
      })
    }, 2000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showSearch: function(e) {
    if (e.currentTarget.dataset.type !== 'btn' && (startX - e.changedTouches[0].clientX) < 80) {
      return
    }
    this.setData({
      layerHide: false
    })
    this.animationSearch(0, 0.5)
  },
  hideSearch: function(e) {
    if ((e.changedTouches[0].clientX - startX) < 80) {
      return
    }
    this.animationSearch('-100%', 0)
    this.setData({
      layerHide: true
    })
  },
  touchStart: function(e){
    //console.log(e)
    startX = e.changedTouches[0].clientX
  },
  animationSearch: function(left, opacity){
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    //this.animation1 = animation1
    //this.animation2 = animation2
    animation1.right(left).step()
    animation2.opacity(opacity).step()
    this.setData({
      animationData1: animation1.export(),
      animationData2: animation2.export()
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
    if(!this.data.searchValue) {
      this.setData({
        searchImages:[]
      })
    }
  },
  search: function() {
    Fetch(URL.SEARCH_URL + this.data.searchValue + '/' + this.data.searchPage + '/' + app.globalData.token + '/', 'get', null, (res) => {
      this.setData({
        searchImages: res.data
      })
    })
  },
  labelSearch: function(e) {
    this.setData({
      searchValue: e.currentTarget.dataset.label
    })
    this.search()
  },
  loadMore: function() {
    var page = this.data.page + 1
    if (this.data.loadFlag) {
      return
    }
    this.setData({
      loadFlag: true
    })
    setTimeout(() => {
      Fetch(URL.LIST_URL + page + '/' + app.globalData.token + '/', 'get', null, (res) => {
        this.setData({
          images: this.data.images.concat(res.data),
          page: page,
          loadFlag: false
        })
      })
    }, 2000)
  },
  loadMoreSearch: function () {
    var page = this.data.searchPage + 1
    if (this.data.loadFlag) {
      return
    }
    this.setData({
      loadFlag: true
    })
    setTimeout(() => {
      Fetch(URL.SEARCH_URL + this.data.searchValue + '/' + page + '/' + app.globalData.token + '/', 'get', null, (res) => {
        this.setData({
          searchImages: this.data.searchImages.concat(res.data),
          searchPage: page,
          loadFlag: false
        })
      })
    }, 2000)
  },
})
