// index.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
    data: {
        motto: '永衡工资条',
        userInfo: {},
        hasUserInfo: false,
        openid: null,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        name: '',
        mobile: '',
        verify: 0
    },
    goToSalary: function () {
        wx.navigateTo({
            url: '/pages/salary/salary',
        })
    },
    formSubmit() {
        let name = this.data.name
        let mobile = this.data.mobile

        if (!name) {
            util.customModal('姓名不能为空', true)
            return;
        }

        if (!mobile) {
            util.customModal('手机不能为空', true)
            return;
        }

        if (!(/^1[3456789]\d{9}$/.test(mobile))) {
            util.customModal('手机格式有误', true)
            return;
        }

        wx.showLoading({title: '加载中'})

        wx.request({
            url: app.globalData.url + 'bind_user',
            method: 'post',
            data: {
                openid: app.globalData.openid,
                name: name,
                phone: mobile
            },
            success: res => {
                if (res.data.err) {
                    util.customModal(res.data.msg, true)
                    return;
                }

                // 绑定成功
                this.setData({verify: 1})
                app.globalData.verify = 1

                // 绑定成功后，不要跳转到工资列表页面，让员工自主进入
                // wx.navigateTo({
                //     url: '/pages/salary/salary',
                // })
            },
            complete: function () {
                wx.hideLoading()
            }
        })

    },
    nameInput: function (e) {
        this.setData({name: e.detail.value})
    },
    mobileInput: function (e) {
        this.setData({mobile: e.detail.value})
    },
    // 事件处理函数
    bindViewTap() {

        // wx.navigateTo({
        //   url: '../logs/logs'
        // })
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
                openid: app.globalData.openid,
                verify: app.globalData.verify
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
            }
            app.openidReadyCallback = (openid, verify) => {
                this.setData({
                    openid: openid,
                    verify: verify
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    })
                }
            })

            wx.login({
                timeout: 3000,
                success: res => {
                    if (res.code) {
                        wx.request({
                            url: app.globalData.url + 'login',
                            data: {code: res.code},
                            success: res => {
                                this.globalData.openid = res.data.data.openid;
                                this.globalData.verify = res.data.data.verify;
                            }
                        })
                    }
                }
            })
        }
    },
    getUserInfo(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})