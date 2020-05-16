module.exports = {
  formatPrice(price) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2);
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success: res => {
            resolve(res.userInfo);
          },
        });
      }).catch(() => reject());
    });
  },
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          const auth = res.authSetting["scope.userInfo"]
          if (auth === true) {
            resolve();
          } else {
            reject("用户未授权");
          }
        },
        fail: () => console.log("请求失败")
      });
    });
  },
};