module.exports = {
  formatPrice(price) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2);
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success(res) {
            resolve(res.userInfo);
          },
        });
      }).catch(() => reject());
    });
  },
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.uesrInfo"] === true) {
            resolve();
          } else {
            reject();
          }
        },
      });
    });
  },
};
