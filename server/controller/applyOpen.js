/**
 *  申请开通相关接口
 */
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')
var constant = require('../common/constant')
var utils = require("../common/utils");

var controller = {};

// 申请开通
controller.applyOpenAccount = function*() {
    var mobile_sign = this.session.mobileSign;
    var result = yield wsclient.applyOpenAccount(this, { "custId": this.session.custId,"mobile_sign": mobile_sign });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        if(!result.success){
            this.session.failmsg = result.msg;  //保存错误提示信息
        }
        this.body = utils.successResult({ msg: result.msg, success: result.success });
    }
}

// 判断用户的核心系统是否完成
controller.findCustAuth = function*() {
    var result = yield wsclient.findCustAuth(this,{"custId":this.session.custId});
    if(!result || result.fail){
      this.body = utils.failResult(constant.error,null)
    }else{
      this.body = utils.successResult(result);
    }
} 

// 用户协议获取
controller.protocol = function*() {
    var protType = this.query.protType;
    var result = yield wsclient.previewProtocol(this,{
        "custId": this.session.custId,
        "protType": protType,
        "loanSubSrc":"VCC"
    })
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result.data.content)
    }
}

// 生成协议
controller.generateProtocol = function*() {
    var result = yield wsclient.generateProtocol(this,{
        "custId": this.session.custId,
        "protType": "BDFZC",
        "loanSubSrc": "VCC"
    })
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result)
    }
}
module.exports = controller;