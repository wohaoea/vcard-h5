/**
 *  商户列表相关接口
 */

var controller = require('../controller/merchantList');

module.exports = function(app) {
    //商户列表
    app.post('/api/merchantList',controller.merchantList);
    app.get('/api/merchantName',controller.merchantName);
}