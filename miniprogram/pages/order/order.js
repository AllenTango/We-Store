// pages/order/order.js
const util = require("../../utils/util.js");
const db = require("../../utils/db.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          userInfo,
        });
      })
      .catch((err) => {
        console.log("没有授权");
      });
    this.getOrders();
    this.data.orderList.forEach((order) => {
      order.productList.forEach(
        (product) => (product.price = util.formatPrice(product.price))
      );
    });
    this.setData({
      orderList: this.data.orderList,
    });
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo,
    });
  },

  getOrders() {
    wx.showLoading({
      title: "加载中...",
    });

    db.getOrders()
      .then(({result}) => {
        wx.hideLoading();
        const data = result;
        if (data) {
          this.setData({
            orderList: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: "加载失败",
        });
      });
  },

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
