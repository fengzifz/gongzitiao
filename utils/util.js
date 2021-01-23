const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const customModal = (msg, err) => {
  wx.showModal({
      showCancel: false,
      title: err ? '错误' : '提示',
      content: msg
  })
}

const checkStatus = (verify) => {
  if (verify == 2) {
      // 锁定用户无法进入其他节目
      wx.navigateTo({
        url: '/pages/index/index',
      })
  }
}

module.exports = {
  formatTime,
  customModal,
  checkStatus
}
