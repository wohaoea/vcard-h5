/**
 * Created by xiongze on 2017/4/20.
 */
var request = require('koa-request');
var config = require('../config/config.js')
var wsclient = {}

var common = {
  get: {
      "simulation": "http://192.168.101.161:3500/simulation?a=1&b=2"
  },
  post:{
      // "heartbeat": "http://192.168.101.180:3000/heartbeat",
      "findVccAccountInfo": config.domain + "account/findVccAccountInfo",
      "applyOpenAccount":config.domain + "account/applyOpenAccount",
      "merchantList":config.domain + "merchant/merchantList",
      "resetPayPassword":config.domain + "account/resetPayPassword",    //重置用户密码
      "setBillRepayDate":config.domain + "account/setBillRepayDate",
      "handleUpdatePasswordSuccess":config.domain + "account/handleUpdatePasswordSuccess",    //查询用户是否修改密码成功
      "billList":config.domain + "bill/billList",                         //查询最后一期账单和未出账单
      "notBillOutOrderList":config.domain + "bill/notBillOutOrderList",   //查询未出账单的订单信息列表
      "OrderListForBill":config.domain + "bill/OrderListForBill",         //查询账单对应的订单列表
      "historyBillList":config.domain + "bill/historyBillList",           //查询历史账单
      "findCustAuth":config.domain + "account/findCustAuth",  //判断用户的核心系统是否完成
      "getBankInfo":config.domain + "account/getBankInfo",   //银行卡管理-已绑定还款卡列表
      "getUserPwdStatus": config.domain + "account/firstResetPassword",  //获取用户是否跳转第三方
      "getRepaymentsInfo": config.domain + "bill/getRepaymentsInfo",   //还款页面查询接口
      "confirmRepay": config.domain + "bill/confirmRepay",   //确认还款
      "getAuthBankInfo": config.domain + "account/getAuthBankInfo",   //银行卡管理-查询开户鉴权卡接口
      "sendAgentSms": config.domain + "account/sendAgentSms",    //鉴权代收短信息获取
      "reAuthBankcard": config.domain + "account/reAuthBankcard",    //还款银行卡的鉴权认证接口
      "getRechargeInfo": config.domain + "bill/getRechargeInfo",   //充值页面查询接口
      "rechargeRepay": config.domain + "bill/rechargeRepay",   //充值接口
      "setDefaultBankcard": config.domain + "account/setDefaultBankcard",  //银行卡管理-设置银行卡为默认卡
      "reportLossCard": config.domain + "account/reportLossCard",    //申请挂失
      "getSupportBankInfos": config.domain + "account/getSupportBankInfos",   //支持的银行卡查询
      "sendPhoneCode": config.domain + "account/sendPhoneCode",    //发送短信验证码接口
      "checkPhoneCode": config.domain + "account/checkPhoneCode",    //验证短信验证码接口
      "findCardInfo": config.domain + "account/findCardInfo",    //查询用户卡信息接口
      //"generateProtocol": config.test + "protocol/generateProtocol",
      //"previewProtocol": config.test + "protocol/previewProtocol",
      "generateProtocol": config.domain1 + "protocol/generateProtocol",
      "previewProtocol": config.domain1 + "protocol/previewProtocol",
      "getCustFlows": config.domain + "bill/getCustFlows"   //用户流水查询
  }
}

Object.keys(common.get).forEach(function(key) {
  wsclient[key] = function *(self, jsondata, callback){
    return yield funFactory(self, "GET", common.get[key], jsondata, callback);
  }
})
Object.keys(common.post).forEach(function(key) {
  wsclient[key] = function *(self, jsondata, callback){
    return yield funFactory(self, "POST", common.post[key], jsondata, callback);
  }
})


function *funFactory(self, method,  url , jsondata, callback) {
  if(self.config.env="local"){
    console.log("Start to invoke web service : " ,url)
    console.log("Invoke web service data is : ", jsondata);
  }else if(self.config.debug){
    self.logger.request("Start to invoke web service : " ,url);
    self.logger.request("Invoke web service data is : ", jsondata);
  }

  if(typeof callback == "function"){
    request({
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      requesConfig: {
        timeout: 1000
      },
      responseConfig: {
        timeout: 1000
      },
      url: url, //
      method: method,
      json:true,
      body:jsondata
    })(function(e, response){
      if(e){
        if(self.config.env="local"){
          console.log("Finish to invoke web service : ", url);
          console.log("Invoke web service is error: ", e);
        }else if(self.config.debug){
          self.app.logger.request("Finish to invoke web service : ", url);
          self.app.logger.request("Invoke web service is error: ", e);
        }
        callback({fail:true})
      }else{
        if(self.config.env="local"){
          console.log("Finish to invoke web service : ", url);
          console.log("Invoke web service result is : ", response.body);
        }else if(self.config.debug) {
          self.app.logger.request("Finish to invoke web service : ", url);
          self.app.logger.request("Invoke web service result is : ", response.body);
        }
        callback(response.body);
      }
    })
    return null;
  }

  try {
    var response = yield request({
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      requesConfig: {
        timeout: 1000
      },
      responseConfig: {
        timeout: 1000
      },
      url: url, //
      method: method,
      json:true,
      body:jsondata
    });
  } catch (e){
    if(self.config.env="local"){
      console.log("Finish to invoke web service : ", url);
      console.log("Invoke web service is error: ", e);
    }else if(self.config.debug){
      self.app.logger.request("Finish to invoke web service : ", url);
      self.logger.request("Invoke web service is error: ", e);
    }
    return {fail:true};
  }
  if(self.config.env="local"){
    console.log("Finish to invoke web service : ", url);
    console.log("Invoke web service result is : ", response.body);
  }else if(self.config.debug) {
    self.app.logger.request("Finish to invoke web service : ", url);
    self.app.logger.request("Invoke web service result is : ", response.body);
  }

  return response.body;
}

module.exports = wsclient;
