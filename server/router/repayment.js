/**
 * 还款相关接口
 */

var controller = require('../controller/repayment');

module.exports = function(app) {
    // 还款信息查询
    app.get('/api/getRepaymentsInfo',controller.getRepaymentsInfo)
    // 确认还款接口
    app.get('/api/confirmRepay',controller.confirmRepay)

}