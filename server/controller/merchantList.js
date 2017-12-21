/**
 *  商户列表相关
 */
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')
var constant = require('../common/constant')
var utils = require("../common/utils");
var merchantName = require("./merchantLogo")
var controller = {};

// 商户列表
controller.merchantList = function*(){
    var result = yield wsclient.merchantList(this, {});
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        if(result.success){
            result = result.data;
            this.body = utils.successResult(result);
        }else{
            this.body = utils.successResult(result,result.msg);
        }
    }
}
// 首页展示商户名单
controller.merchantName = function*(){
    this.body = utils.successResult(merchantName)
}

module.exports = controller;
