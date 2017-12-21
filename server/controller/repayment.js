/**
 *  还款相关
 */
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')

var constant = require('../common/constant')

var utils = require("../common/utils");

var controller = {};

// 还款页面信息查询
controller.getRepaymentsInfo = function*(){
    var result = yield wsclient.getRepaymentsInfo(this, {custId : this.session.custId});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        if(result.success){
            this.session.billNos = result.data.billNos;
            this.body = utils.successResult(result.data,result.msg);
        }else{
            this.body = utils.successResult({},result.msg);
        } 
    }
}

// 确认还款
controller.confirmRepay = function*() {
    var result = yield wsclient.confirmRepay(this, {custId : this.session.custId ,billNos: this.session.billNos});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result,result.msg);
    }
}

module.exports = controller;
