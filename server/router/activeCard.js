/**
 *  激活相关接口
 */

var controller = require('../controller/activeCard');

module.exports = function(app) {
    //激活页面
    // app.post('/api/activeCard', controller.activeCard);
    //短信验证码
    app.post('/api/SMS', controller.SMS);
    //选择还款日期
    app.post('/api/selectDate', controller.selectDate);
    //更新用户修改密码状态
    app.post('/api/handleUpdatePasswordSuccess',controller.handleUpdatePasswordSuccess);
    // 获取用户是否跳转到第三方修改密码（测试接口）
    app.get('/api/getUserPwdStatus',controller.getUserPwdStatus);
    // 设置还款日时间
    app.get('/api/setDate',controller.setDate);
}