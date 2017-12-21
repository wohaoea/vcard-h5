/**
 *  虚拟银行卡公用接口
 */
var controller = require('../controller/bankInfo');
module.exports = function(app) {
    //银行卡管理查询接口
    app.post('/api/getBankInfo',controller.getBankInfo);
    app.post('/api/getAuthBankInfo',controller.getAuthBankInfo);
    app.post('/api/sendAgentSms',controller.sendAgentSms);
    app.post('/api/repayBankCardActive',controller.repayBankCardActive);
    app.post('/api/setDefaultBankcard',controller.setDefaultBankcard);
    app.post('/api/reportLossCard',controller.reportLossCard);
    app.get('/api/realInfo',controller.realInfo);
    app.get('/api/getSupportBankInfos',controller.getSupportBankInfos);
    app.get('/api/findCardInfo',controller.findCardInfo);
};

