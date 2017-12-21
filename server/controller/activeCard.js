/**
 *  卡激活相关接口
 */

var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')

var constant = require('../common/constant')

var utils = require("../common/utils");

var controller = {};

// 账单日接口
controller.setDate = function*() {
    var date = [
        {zd: '01',hk: '13'}, 
        {zd: '05',hk: '18'}, 
        {zd: '09',hk: '21'}, 
        {zd: '13',hk: '25'}, 
        {zd: '17',hk: '28'}, 
        {zd: '21',hk: '03'}, 
        {zd: '25',hk: '07'}, 
        {zd: '28',hk: '11'}
    ];
    this.body = utils.successResult(date)
}

// 选择账单日
controller.selectDate = function*() {
    var body = this.request.body;
    var result = yield wsclient.setBillRepayDate(this, { "custId": this.session.custId,"billDate":body.billDate,"repayDate":body.repayDate});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult({success:result.success})
    }
};

// 短信验证码
controller.SMS = function*() {
    this.body = utils.successResult({ "success": true, "code": '123456' });
};

// 更新修改密码状态
controller.handleUpdatePasswordSuccess = function*() {
    var result = yield wsclient.handleUpdatePasswordSuccess(this,{"custId": this.session.custId });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result);
    }
} 

// 获取用户是否跳转到第三方修改密码（测试接口）
controller.getUserPwdStatus = function*() {
    var result = yield wsclient.getUserPwdStatus(this,{"custId": this.session.custId});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result);
    }
}

module.exports = controller;