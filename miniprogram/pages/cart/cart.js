// pages/cart/cart.js
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: true,
    cartList: [{
      id: 1,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      name: 'Wallet',
      price: '100.00',
      source: 'CHINA',
      count: 1,
    }, {
      id: 2,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
      name: 'Guitar',
      price: '200.00',
      source: 'SWEDEN',
      count: 3,
    }, {
      id: 3,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
      name: 'Stapler',
      price: '300.00',
      source: 'GERMANY',
      count: 4,
    }, {
      id: 4,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
      name: 'Leafy vegetables',
      price: '400.00',
      source: 'NEW ZEALAND',
      count: 2,
    }, {
      id: 5,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
      name: 'Compass',
      price: '500.00',
      source: 'USA',
      count: 1,
    }],
    isSelectAllChecked: false,
    isCardEdit: false,
    cartCheckMap: {},
    cartTotal: '45.00'
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
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo,
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
