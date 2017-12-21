/**
 * 充值相关接口
 */

var controller = require('../controller/recharge');

module.exports = function(app) {
    app.post('/api/getRechargeInfo',controller.getRechargeInfo);
    app.post('/api/rechargeRepay',controller.rechargeRepay);
}