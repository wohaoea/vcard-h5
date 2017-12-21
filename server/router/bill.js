/**
 *  账单查询相关接口
 */
var controller = require('../controller/bill');
module.exports = function(app) {
    //最后一期账单和未出账单
    app.get('/api/bill/billList',controller.billList);
    //未出账单的订单信息列表
    app.get('/api/bill/notBillOutOrderList',controller.notBillOutOrderList);
    //账单对应的订单列表
    app.get('/api/bill/OrderListForBill',controller.OrderListForBill);
    //历史账单
    app.get('/api/bill/historyBillList',controller.historyBillList);
    // 用户流水
    app.get('/api/bill/getCustFlows',controller.getCustFlows)
};