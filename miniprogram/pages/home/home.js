// pages/home/home.js
const db = require("../../utils/db");
const util = require("../../utils/util.js");

// console.log(db)
Page({
  /**
   * Page initial data
   */
  data: {
    productList: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getProductList();
  },
  getProductList() {
    wx.showLoading({
      title: "正在加载...",
    });
    db.getProductList()
      .then((res) => {
        // console.log(res);
        wx.hideLoading();
        const productList = res.data;
        productList.forEach((product) => {
          product.price = util.formatPrice(product.price);
        });
        if (productList.length) {
          this.setData({
            productList,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
      });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {},

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {},
});
