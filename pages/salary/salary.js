// logs.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
    data: {
        salaries: {}
    },
    onLoad() {
        util.checkStatus(app.globalData.verify);
        this.getSalary();
    },
    goToDetails: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/details/details?id=' + id
        })
    },
    getSalary: function () {
        let openid = app.globalData.openid;

        if (!openid) {
            wx.navigateTo({
                url: '/pages/index/index',
            })
            return
        }

        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: app.globalData.url + 'get_salary',
            method: 'post',
            data: {openid: openid},
            success: res => {
                let data = res.data;

                if (data.err == 1) {
                    util.customModal(data.msg, true);
                    return;
                }

                // 成功
                this.setData({
                    salaries: data.data
                })
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    }
})
