/**
 * Created by xiongze on 2017/4/21.
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
    }
  }
  return format
}

if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this &&
        !fun.call(thisp, this[i], i, this))
        return false;
    }

    return true;
  };
}

if (typeof Array.prototype.reduce != "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
    var previous = initialValue, k = 0, length = this.length;
    if (typeof initialValue === "undefined") {
      previous = this[0];
      k = 1;
    }

    if (typeof callback === "function") {
      for (k; k < length; k++) {
        this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}

exports.extends = function (des, src, override) {
  if (src instanceof Array) {
    for (var i = 0, len = src.length; i < len; i++)
      extend(des, src[i], override)
  }
  for (var j in src) {
    des[j] = src[j]
  }
  return des
}

exports.isEmail = function(value){
  var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
  return reg.test(value)
}

exports.isMobile = function(value){
  return /^\d*$/.test(value)&&value.length==11&&value[0]==1
}

/*
 * 判断是否为全数字
 */
exports.isNum = function(value) {
  return /^\d*$/.test(value);
}

/*
 * 判断一个对象是否为空。
 */
exports.isNull = function(value) {
  return !value || value == null || (typeof(value) == 'string' && value.trim().length == 0);
};

/**
 * 判断是否为正确的身份证号
 */
exports.isIdentity = function(value){
  return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
}

/**
 * 判断是否为空对象
 */
exports.isEmptyObject = function(obj){
    for(var n in obj){return false} 
    return true; 
} 


/**
 *  脱敏处理
 */
exports.encryption = function(cardNo){
  if(cardNo){
    var newCardNo = '';
    if(cardNo){
        newCardNo = cardNo.slice(0,4) + '********' + cardNo.slice(-4)
        return newCardNo
    }
    return newCardNo;
  }   
}

/**
 *  每四位加上空格
 */
exports.dealCard = function(str){
    str = str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
    return str;
}

/**
 *  小数点后保留数字
 */
exports.toFixed = function(value,number){
    if(value){
        return Number(value).toFixed(number)
    }else{
        return '0.00'
    }
}