/**
 *  虚拟银行卡公用接口
 */
var controller = require('../controller/common');
module.exports = function(app) {
    // 通过sign查询用户custId
    app.post('/api/findOneBySign',controller.findOneBySign);
    // 用户信息查询
    app.post('/api/userInfo', controller.userInfo);
    // 修改密码
    app.post('/api/resetPayPassword',controller.resetPayPassword);
    // 发送短信验证码接口
    app.post('/api/sendPhoneCode',controller.sendPhoneCode);
    // 验证短信验证码接口
    app.post('/api/checkPhoneCode',controller.checkPhoneCode);
    // 获取cms IMG
    app.get(/^\/share\/([\w\/\.\-\_]+)$/, controller.getShareImg)

    app.get('/api/getActivityInfo',controller.getActivityInfo)
};

