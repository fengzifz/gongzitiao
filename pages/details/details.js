// logs.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
    data: {
        salary: {}
    },
    onLoad(options) {
        util.checkStatus(app.globalData.verify)
        this.getSalaryDetails(options.id);
    },
    goBack: function () {
        wx.navigateBack()
    },
    getSalaryDetails: function (id) {
        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: app.globalData.url + 'salary/details',
            method: 'post',
            data: {id: id, openid: app.globalData.openid},
            success: res => {
                if (res.data.err == 1) {
                    util.customModal(res.data.msg, true)
                    return
                }

                let salary = res.data.data;
                this.setData({
                    salary: salary
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    }
    
})
