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
      .catch( err => {
        console.log(err)
        wx.showToast({
          icon: "none",
          title: "请先登录",
        });
        return {};
      });
  },
  addToCart(data) {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "addToCart",
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
  getCart() {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "getCart",
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
  updateCart(list) {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "updateCart",
          data:{
            list,
          },
        });
      })
      .catch((err) => {
        console.log(err)
        wx.showToast({
          icon: "none",
          title: "请先登录",
        });
        return {};
      });
  },
  addReview(data) {
    return util
      .isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "addReview",
          data,
        });
      })
      .catch( err => {
        console.log(err)
        wx.showToast({
          icon: "none",
          title: "请先登录",
        });
        return {};
      });
  },
  getReviews(productId) {
    return db.collection("review").where({
      productId,
    }).get()
  },
  uploadImage(imgPath) {
    return wx.cloud.uploadFile({
      cloudPath: `review/${util.getId()}`,
      filePath: imgPath,
    })
  },
};
