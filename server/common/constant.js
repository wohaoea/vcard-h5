/**
 * Created by Administrator on 2016/11/1.
 */
var constant = {};

constant.success = {
  code:"000000",
  message:"成功"
};  // 成功

constant.notLogin = {
  code:"999997",
  message:"未登录"
};  // 失败

constant.unauthorized = {
  code:"999998",
  message:"非法访问"
};  // 失败

constant.error = {
  code:"999999",
  message:"服务器出了一点小故障"
};  // 失败

module.exports = constant;
