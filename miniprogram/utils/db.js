const util = require("./util.js");
const db = wx.cloud.database({
  env: "dev-pupws",
});

module.exports = {
  getProductList() {
    return db.collection("product").get();
  },
  getProductDetail(id) {
    return wx.cloud.callFunction({
      name: "productDetail",
      data: {
        id,
      },
    });
  },
  addToOrder(data) {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "addToOrder",
          data,
        });
      })
      .catch(() => {
        wx.showToast({
          icon: "none",
          title: "请先登录",
        });
        return {};
      });
  },
  getOrders() {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "getOrders",
        });
      })
      .catch(() => {
        wx.showToast({
          icon: "none",
          title: "请先登录",
        });
        return {};
      });
  },
};
