// pages/detail/detail.js
const db = require("../../utils/db.js");
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(options.id);
  },

  getProductDetail(id) {
    wx.showLoading({
      title: "加载中...",
    });
    db.getProductDetail(id)
      .then(({ result }) => {
        wx.hideLoading();
        const data = result;
        data.price = util.formatPrice(data.price);
        if (data) {
          this.setData({
            product: data,
          });
        } else {
          setTimeout(() => wx.navigateBack(), 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        setTimeout(() => wx.navigateBack(), 2000);
      });
  },

  buy() {
    wx.showLoading({
      title: "提交订单...",
    });
    const productToBuy = Object.assign(
      {
        count: 1,
      },
      this.data.product
    );
    productToBuy.productId = productToBuy._id;

    db.addToOrder({
      list: [productToBuy],
    })
      .then((result) => {
        wx.hideLoading();
        const data = result.result;
        if (data) {
          wx.showToast({
            title: "成功",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: "提交失败",
        });
      });
  },

  addToCart() {
    wx.showLoading({
      title: "提交订单...",
    });
    db.addToCart(this.data.product)
      .then((result) => {
        wx.hideLoading();
        const data = result.result;
        if (data) {
          wx.showToast({
            title: "成功",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: "提交失败",
        });
      });
  },

  onTapReviewEntry() {
    if (this.data.product.reviewCount) {
      const product = this.data.product;
      wx.navigateTo({
        url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
