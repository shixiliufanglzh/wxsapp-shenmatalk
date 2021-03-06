// const app = getApp();
const apiUrl = require('constant.js');

module.exports = (app, that, callBack) => {
  wx.getUserInfo({
    data: {
      lang: 'zh_CN',
      withCredentials: true
    },
    success: function (userMsg) {
      wx.hideLoading();
      app.globalData.userInfo = userMsg.userInfo

      wx.request({
        url: apiUrl.GET_USER_INFO,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sessionKey': app.globalData.sessionKey
        },
        success: function (res) {
          apiUrl.responseCodeCallback(res.data.responseCode, res.data.responseDesc, res.data.data);
          if (res.data.responseCode == 2000) {
            console.log('getuserinfo页面pointInfo', res);
            app.globalData.pointInfo = {
              aliAccount: res.data.data.aliAccount,
              point: res.data.data.userPoint,
              money: res.data.data.userMoney,
              id: res.data.data.id
            }
            that.setData({
              pointInfo: app.globalData.pointInfo,
            })

            if (!!callBack) {
              callBack();
            }
          }
        }
      })
    },
    fail: function (err) {
      wx.hideLoading();
      console.log('getuserinfo错误信息', err);
      wx.showModal({
        title: '提示',
        content: '小程序需要获取用户信息权限才能正常使用',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: function (data) {
                if (data) {
                  if (data.authSetting["scope.userInfo"] == true) {
                    wx.getUserInfo({
                      data: { lang: 'zh_CN' },
                      success: res => {
                        console.log('微信后台拉取用户信息', res)
                        app.globalData.userInfo = res.userInfo
                        if (that.data.userInfo){
                          that.setData({
                            userInfo: app.globalData.userInfo
                          })
                        }
                      }
                    })
                    wx.request({
                      url: apiUrl.GET_USER_INFO,
                      method: "GET",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'sessionKey': app.globalData.sessionKey
                      },
                      success: function (res) {
                        apiUrl.responseCodeCallback(res.data.responseCode, res.data.responseDesc, res.data.data);
                        if (res.data.responseCode == 2000) {
                          console.log('自己后台拉取用户信息pointInfo', res);
                          app.globalData.pointInfo = {
                            aliAccount: res.data.data.aliAccount,
                            point: res.data.data.userPoint,
                            money: res.data.data.userMoney,
                            id: res.data.data.id
                          }
                        }
                      }
                    })
                  }
                }
              },
              fail: function () {
                console.info("设置失败返回数据");
              }
            });
          }
        }
      })
    }
  })

  // wx.request({
  //   url: apiUrl.GET_USER_INFO,
  //   method: "GET",
  //   header: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'sessionKey': app.globalData.sessionKey
  //   },
  //   success: function (res) {
  //     apiUrl.responseCodeCallback(res.data.responseCode, res.data.responseDesc, res.data.data);
  //     if (res.data.responseCode == 2000) {
  //       console.log('getuserinfo页面pointInfo', res);
  //       app.globalData.pointInfo = {
  //         aliAccount: res.data.data.aliAccount,
  //         point: res.data.data.userPoint,
  //         money: res.data.data.userMoney,
  //         id: res.data.data.id
  //       }
  //       that.setData({
  //         pointInfo: app.globalData.pointInfo,
  //       })

  //       if (!!callBack){
  //         callBack();
  //       }
  //     }
  //   }
  // })
}