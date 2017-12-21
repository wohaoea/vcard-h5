/**
 *  账单相关接口
 */
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')

var constant = require('../common/constant')

var utils = require("../common/utils");

var controller = {};

//最后一期账单和未出账单
controller.billList = function*() {
    var result = yield wsclient.billList(this,{custId:this.session.custId});
    if(!result || result.fail){
        this.body = this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult({lastBill:result.lastBill,newBill:result.newBill},result.msg);
    }
};
//未出账单的订单信息列表
controller.notBillOutOrderList = function*() {
  var result = yield wsclient.notBillOutOrderList(this,{custId:this.session.custId});
  if(!result || result.fail){
    this.body = this.body = utils.failResult(constant.error,null)
  }else{
    this.body = utils.successResult({orderList:result.orderList},result.msg);
  }
};
//账单对应的订单列表
controller.OrderListForBill = function*() {
  var result = yield wsclient.OrderListForBill(this,{billNo:this.query.billNo});
  if(!result || result.fail){
    this.body = this.body = utils.failResult(constant.error,null)
  }else{
    this.body = utils.successResult({orderList:result.orderList},result.msg);
  }
};
//历史账单
controller.historyBillList = function*() {
  var result = yield wsclient.historyBillList(this,{custId:this.session.custId});
  if(!result || result.fail){
    this.body = this.body = utils.failResult(constant.error,null)
  }else{
    this.body = utils.successResult({yearList:result.yearList,billsListMap:result.billsListMap},result.msg);
  }
};

// 用户流水
controller.getCustFlows = function*() {
    var result = yield wsclient.getCustFlows(this,{custId:this.session.custId});
    if(!result || result.fail){
      this.body = this.body = utils.failResult(constant.error,null)
    }else{
      this.body = utils.successResult(result.data,result.msg);
    }
}

module.exports = controller;
