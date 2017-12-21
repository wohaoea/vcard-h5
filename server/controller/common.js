var parse = require('co-busboy');
var fs = require('co-fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')
var constant = require('../common/constant')
var utils = require("../common/utils");
var appdb = require("../database/appdb");
var controller = {};

// 获取用户custId
controller.findOneBySign = function*() {
    var body = this.request.body||{};
    var sessionSign = this.session.sign;
    var sign,msg;
    if(body.sign){
        sign = body.sign;
        if(sessionSign && sign == sessionSign) {
            this.body = utils.successResult({msg:"Same user"});
        }else{
            var result = yield appdb.findOneBySign({"SIGN": sign})
            if(result && result["_doc"] &&result["_doc"]["CUST_ID"]){
                this.session.sign = sign;
                this.session.custId = result["_doc"]["CUST_ID"];
                this.session.mobileSign = result["_doc"]["SID"];
                this.session.failmsg = '';  //开户失败的错误提示信息
                msg = {
                    code: 1,
                    msg: '登录成功'
                }
                this.body = utils.successResult(msg)
            }else{
                this.body = utils.failResult(constant.notLogin,null)
            }
        }
    }else{
        if(sessionSign){
          var result = yield appdb.findOneBySign({"SIGN": sessionSign})
          if(result && result["_doc"] &&result["_doc"]["CUST_ID"]){
            msg = {
              code: 1,
              msg: '登录成功'
            }
            this.body = utils.successResult(msg)
          }else{
            this.body = utils.failResult(constant.notLogin,null)
          }
        }else{
            this.body = utils.failResult(constant.notLogin,null)
        }
    }
}

// 首页查询用户信息
controller.userInfo = function*() {
    var isOpen,status,isLock,cardStatus,dealComplete,pending,failmsg;
    var result = yield wsclient.findVccAccountInfo(this, { "custId": this.session.custId });
    if(!result || result.fail){
        this.session.cardNo = '8888888888888888'
        this.body = utils.failResult(constant.error,null)
    }else{
        var bizStatus = ["waitDeal","dealing","fail","active","unloan","loan","loan"];
        var data = result.data;
        var isActive = data.bizStatus > 3 ? true : false;
        var isWaitActive = false;
        isOpen = data.isVcc == 1 ?　"Y" : "N";
        status = bizStatus[data.bizStatus];
        isWaitActive = data.bizStatus == 3 ? true : false;
        if(data.cardStatus == 6 || data.cardStatus == 7) {
            isLock = "Y";
            cardStatus = "active";
            dealComplete = data.cardStatus == 7 ? true : false;
            pending = 'success'
        }else if(data.cardStatus == 5){
            isLock = "N";
            cardStatus = "active";
            pending = 'success'
        }else{
            cardStatus = "disActive";
            if(data.cardStatus == 0 || data.cardStatus == 1 || data.cardStatus == 2){
                pending = 'dealing';
            }else if(data.cardStatus == 3){
                pending = 'fail';
            }
        }
        // 银行卡号每隔4位数字加上空格
        var cardNo = '';
        if(data.cardNo){
            this.session.cardNo = data.cardNo;
            for(var i = 0;i < data.cardNo.length;i++){
                if(i%4 == 0 && i != 0){
                    cardNo += ' '
                }
                cardNo += data.cardNo[i]
            }
        }else{
            this.session.cardNo = '8888888888888888'
            cardNo = '8888  8888  8888  8888'
        }
        this.session.custName = data.custName;
        this.session.certNo = data.certNo;
        creditAmt = data.creditAmt ? data.creditAmt : 5000;
        repayDate = data.repayDate;
        billDate = data.billDate;
        //如果用户的开户状态为失败，判断是否有失败提示信息
        if(status == 'fail'){
            if(this.session.failmsg){
                failmsg = this.session.failmsg;
            }
        }
        this.body = utils.successResult({
            "status": status,
            "isOpen": isOpen,
            "isLock": isLock,
            "cardStatus":cardStatus,
            "cardNo": cardNo,
            "creditAmt": creditAmt,
            "billAmount": data.billAmount,
            "repayAmount": data.repayAmount,
            "billDate": billDate,
            "repayDate": repayDate,
            "isLoan": false,
            "isActive": isActive,
            "isWaitActive": isWaitActive,
            "dealComplete": dealComplete,
            "pending": pending,
            "failmsg": failmsg
        });
    }
};

// 修改密码
controller.resetPayPassword = function*() {
    var result = yield wsclient.resetPayPassword(this, { "custId": this.session.custId });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        result.cardNo = this.session.cardNo;
        this.body = utils.successResult(result);
    }
}

// 获取短信验证码
controller.sendPhoneCode = function*() {
    var result = yield wsclient.sendPhoneCode(this, {
        "custId": this.session.custId
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result);
    }
}

// 验证手机验证码
controller.checkPhoneCode = function*() {
    var body = this.request.body;
    var result = yield wsclient.checkPhoneCode(this, {
        "custId": this.session.custId,
        "phoneCode": body.phoneCode
    });
    if(!result || result.fail){
        this.body = utils.failResult(constant.error,null)
    }else{
        this.body = utils.successResult(result);
    }
}

/*
 * 获取cms IMG
 */
controller.getShareImg = function *() {
  if (!this.params[0]) {
    res.send("无此图片");
  }
  var imgid = this.params[0];

  var accessPath = "/share/";

  try{
    var data = yield fs.readFile(accessPath + imgid);
    if (data) {
      this.set("Content-Type", 'image/jpeg');
      this.body = data;
    } else {
      this.body = "图片不存在";
    }
  }catch (e){
    this.body = "图片不存在";
  }

}


controller.getActivityInfo = function *() {
    try{
        var data = yield fs.readFile("/share/niuwa-cms/images/catalog/h5_vcc_banner.json");
        if (data) {
            this.set("Content-Type", 'utf-8');
            data = JSON.parse(data);
            this.body = data;
        } else {
            this.body = "暂无活动";
        }
    }catch (e){
        this.body = "暂无活动";
    }

}

module.exports = controller;
