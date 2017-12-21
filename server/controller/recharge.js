/**
 *  充值页面相关接口
 */

var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')

var constant = require('../common/constant')

var utils = require("../common/utils");

var controller = {};

// 充值页面信息查询
controller.getRechargeInfo = function*(){
    var result = yield wsclient.getRechargeInfo(this, {custId : this.session.custId});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        if(result.success){
            this.session.billNo = result.data.billNo;
            this.body = utils.successResult(result.data,result.msg);
        }else{
            this.body = utils.successResult({},result.msg);
        } 
    }
}

// 充值接口
controller.rechargeRepay = function*(){
    var body = this.request.body;
    var result = yield wsclient.rechargeRepay(this, {
        custId : this.session.custId,
        bankCardNo: body.bankCardNo,
        acctNo: body.acctNo,
        batchNo: body.batchNo,
        smsCode: body.smsCode,
        rechargeAmount: body.rechargeAmount
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

module.exports = controller;

