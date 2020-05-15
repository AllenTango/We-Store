// pages/home/home.js
const db = wx.cloud.database({
  env: "dev-pupws",
});

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
    db.collection("product")
      .get()
      .then((res) => {
        // console.log(res);
        wx.hideLoading();
        const productList = res.data;
        productList.forEach((product) => {
          product.price = parseFloat(
            Math.round(product.price * 100) / 100
          ).toFixed(2);
          // wx.cloud
          //   .getTempFileURL({ fileList: [product.image] })
          //   .then( ({fileList}) => product.image = fileList[0].tempFileURL)
          //   .catch((err) => console.log(err));
        });
        console.log(productList[0].image)
        if (productList.length) {
          this.setData({
            productList
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
