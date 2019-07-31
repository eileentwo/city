var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },
  onLoad: function () {
    var that = this;
    
    var BMap = new bmap.BMapWX({
      ak: 'zpeGQdZeik72UXNo4ntVAtE2YMhtbAGA'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(data)
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  makertap: function (e) {
    var that = this;
    console.log(e)
    var id = e.markerId;
    console.log(wxMarkerData)
    that.showSearchInfo(wxMarkerData, id);
  },
  showSearchInfo: function (data, i) {
    var that = this;
    console.log(data,45)
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business
      }
    });
  }

})