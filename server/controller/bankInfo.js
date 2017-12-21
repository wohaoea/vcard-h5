/**
 *  银行卡信息管理接口
 */

var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')
var constant = require('../common/constant')
var utils = require("../common/utils");
var controller = {};

// 银行卡管理-已绑定还款卡列表
controller.getBankInfo = function*() {
    var result = yield wsclient.getBankInfo(this,{"custId":this.session.custId});
    var commonCardNo = [];
    // 银行卡号进行脱敏处理
    var reg = /^(\d{4})(\d*)(\d{4})$/;
    for(var i = 0;i < result.data.length;i++){
        commonCardNo.push(result.data[i].bankcardNo)
        result.data[i].bankcardNo = utils.dealCard(result.data[i].bankcardNo);
        result.data[i].bankcardNo = result.data[i].bankcardNo.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
    }
    result.commonCardNo = commonCardNo;
    if(!result || result.fail){
      this.body = utils.failResult(constant.error,null)
    }else{
      this.body = utils.successResult(result,result.msg);
    }
}

// 银行卡管理-查询开户鉴权卡接口
controller.getAuthBankInfo = function*() {
    var result = yield wsclient.getAuthBankInfo(this,{"custId":this.session.custId});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result.data,result.msg);
    }   
}

// 银行卡绑定验证码获取
controller.sendAgentSms = function*(){
    var body = this.request.body;
    var result = yield wsclient.sendAgentSms(this,{
        "custId":this.session.custId,
        "bankCardNo": body.bankCardNo,
        "mobile": body.mobile,
        "transType": body.transType
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

// 还款银行卡的鉴权认证接口
controller.repayBankCardActive = function*(){
    var body = this.request.body;
    var result = yield wsclient.reAuthBankcard(this,{
        "custId":this.session.custId,
        "bankCardNo": body.bankCardNo,
        "mobile": body.mobile,
        "batchNo": body.batchNo,
        "smsCode": body.smsCode,
        "bankName": body.bankName,
        "bankCode": body.bankCode
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

controller.setDefaultBankcard = function*(){
    var body = this.request.body;
    var result = yield wsclient.setDefaultBankcard(this,{
        "custId": this.session.custId,
        "bankCardNo": body.bankCardNo
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

controller.reportLossCard = function*(){
    var body = this.request.body;
    var result = yield wsclient.reportLossCard(this,{
        "custId": this.session.custId,
        "cardNo": body.cardNo
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

// 用户信息
controller.realInfo = function*(){
    var result = {
        custName: this.session.custName,
        certNo: this.session.certNo
    }
    this.body = utils.successResult(result);
}

// 支持的银行卡信息
controller.getSupportBankInfos = function*(){
    var result = yield wsclient.getSupportBankInfos(this,{});
    if(!result || result.fail){
         this.body = utils.failResult(constant.error,null)
    }else{
        if(result.success){
            this.body = utils.successResult(result.data,result.msg)
        }else{
            this.body = utils.failResult({
                code: '999996',
                message: result.msg
            },null)
        }
    }
}

// 查询用户卡信息接口
controller.findCardInfo = function*(){
    var result = yield wsclient.findCardInfo(this,{"custId": this.session.custId});
    var cardType = ['一类','二类','三类'];
    var cardIndex = result.data.cardType - 1;
    if(!result || result.fail){
         this.body = utils.failResult(constant.error,null)
    }else{
        if(result.success){
            result.data.cardType = cardType[cardIndex]; 
            result.data.maxLoanAmt = result.data.maxLoanAmt.toFixed(2);
            result.data.waitRepayCapital = result.data.waitRepayCapital.toFixed(2);
            result.data.yearAccuLoanAmt = result.data.yearAccuLoanAmt.toFixed(2);
            result.data.annualAmt = result.data.annualAmt.toFixed(2);
            result.data.usableAmount = result.data.usableAmount.toFixed(2);
            result.data.reaminAnnualAmt = result.data.reaminAnnualAmt.toFixed(2);
            this.body = utils.successResult(result.data,result.msg)
        }else{
            this.body = utils.failResult({
                code: '999996',
                message: result.msg
            },null)
        }
    }
}


module.exports = controller;