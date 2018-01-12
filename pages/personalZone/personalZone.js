// pages/personalZone/personalZone.js
const app = getApp();
const getUserInfo = require('../../utils/getUserInfo.js');
const apiUrl = require('../../utils/constant.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    adver: apiUrl.GET_ADVER + '?url=http://www.jianbid.com/public/index.html',
    userInfo: {},
    pointInfo: {},
    hasUserInfo: false,
    animationData: {},
    pointInstruState: false
  },

  //显示芝麻分说明
  showPointInstruction: function () {
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.bottom(0).step();
    this.setData({
      animationData: animation.export(),
      pointInstruState: true
    })
  },
  //隐藏芝麻分说明
  hidePointInstruction: function () {
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.bottom("-570rpx").step();
    this.setData({
      animationData: animation.export(),
      pointInstruState: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
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

  showPic: function () {
    wx.previewImage({
      current: apiUrl.ADMIN + '/qrbig.jpg', // 当前显示图片的http链接
      urls: [apiUrl.ADMIN + '/qrbig.jpg', apiUrl.ADMIN + '/qrcode.png'] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    getUserInfo(app, that, null);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    wx.showLoading({
      title: "加载中...",
      mask: true,
      success: function () {
        that.onLoad();
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})