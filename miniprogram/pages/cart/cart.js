// pages/cart/cart.js
const util = require("../../utils/util.js");
const db = require("../../utils/db.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: true,
    cartList: [],
    isSelectAllChecked: false,
    isCardEdit: false,
    cartCheckMap: {},
    cartTotal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    util
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          userInfo,
        });
        this.getCart()
      })
      .catch((err) => {
        console.log("没有授权");
      });
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo,
    });
    this.getCart();
  },

  getCart() {
    wx.showLoading({
      title: '加载中...',
    })

    const cartCheckMap = this.data.cartCheckMap;
    db.getCart().then(result => {
      wx.hideLoading()

      const data = result.data;

      if (data.length) {
        let checkout = 0;
        data.forEach(product => {
          checkout += product.price * product.count
        })
      }

      this.setData({
        // cartTotal: checkout,
        cartTotal: util.priceFormat(0),
        cartList: data
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '加载失败',
      })
    })
  },

  onTapCheck(event) {
    const checkId = event.crrentTarget.dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let isSelectAllChecked = this.data.isSelectAllChecked
    const cartList = this.data.cartList
    let cartTotal = 0

    if (checkId === "selectAll") {
      isSelectAllChecked = !isSelectAllChecked
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId]
      isSelectAllChecked = true
      cartList.forEach(product => {
        if (cartCheckMap[product.productId]) {
          isSelectAllChecked = false
        }
      })
    }

    cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })
  },

  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0
    certList.forEach(product => {
      if (cartCheckMap[product.productId]) {
        checkout += product.price * product.count
      }
    })
    return util.priceFormat(checkout)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
});