// pages/add-review/add-review.js
const util = require("../../utils/util.js");
const db = require("../../utils//db.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    product: {},
    reviewContent: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util
      .getUserInfo()
      .then((userInfo) => {
        this.setData({
          userInfo,
        });
        this.setProduct(options);
      })
      .catch((err) => {
        console.log("错误：", err);
      });
  },

  setProduct(options) {
    const { productId, name, price, image } = options;

    this.setData({
      product: { productId, name, price, image },
    });
  },

  addReview(event) {
    let content = this.data.reviewContent;
    if (!content) return;

    wx.showLoading({
      title: "上传中...",
    });

    this.uploadImage(images => {
      db.addReview({
        username: this.data.userInfo.nikeName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        productId: this.data.product.productId,
        images,
      })
        .then((result) => {
          wx.hideLoading();
  
          const data = result.result;
  
          if (data) {
            wx.showToast({
              icon: "none",
              title: "成功",
            });
          }
  
          setTimeout(() => wx.navigateBack(), 1500);
        })
        .catch((err) => {
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            icon: "none",
            title: "提交失败",
          });
        });
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      complete: (res) => {
        this.setData({
          previewImages: res.tempFilePaths
        })
      },
    })
  },

  previewImage(event) {
    const target = event.currentTarget;
    const src = target.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  
  uploadImage(callback) {
    const previewImages = this.data.previewImages;
    const images = [];

    if (previewImages.length) {
      let imageCount = previewImages.length;
      for (let i = 0; i < imageCount; i++) {
        db.uploadImage(previewImages[i]).then( result =>{
          console.log(result)
          images.push(result.fileID)
          if (i === imageCount - 1) {
            callback && callback(images)
          }
        }).catch(err => {
          console.log("err", err);
        })
      }
    } else {
      callback && callback(images)
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

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim(),
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
