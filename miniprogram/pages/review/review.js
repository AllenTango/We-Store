// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    reviewList: [{
      avatar: '/images/me-sel.png',
      username: 'test1',
      createTime: '2019/01/01',
      content: 'test comment',
    },
    {
      avatar: '/images/me-sel.png',
      username: 'test2',
      createTime: '2019/01/01',
      content: 'test comment'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setProduct(options);
  },

  setProduct(options) {
    const { productId, name, price, image } = options;

    this.setData({
      product: { productId, name, price, image },
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})