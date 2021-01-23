// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        wx.showLoading({
            title: '正在验证...',
        });

        // 登录
        wx.login({
            timeout: 3000,
            success: res => {
                if (res.code) {
                    wx.request({
                        url: this.globalData.url + 'login',
                        data: {code: res.code},
                        success: res => {

                            // 储存全局 openid
                            this.globalData.openid = res.data.data.openid;
                            this.globalData.verify = res.data.data.verify;

                            // 避免网络延缓出现的无法赋值问题，增加回调函数来赋值 openid
                            if (this.openidReadyCallback) {
                                this.openidReadyCallback(res.data.data.openid, res.data.data.verify)
                            }

                            if (res.data.data.verify == 1) {
                                // 验证成功
                                // 跳转到主界面
                                // wx.navigateTo({
                                //     url: '/pages/salary/salary',
                                // })
                            }

                        }
                    })
                }
            },
            complete: function () {
                wx.hideLoading()

            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }

                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        openid: null,
        verify: 0,
        url: 'http://gongzitiao.damon.com/wechat/'
    }
})
