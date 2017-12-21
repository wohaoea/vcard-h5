/**
 *  申请开通相关接口
 */

var controller = require('../controller/applyOpen');

module.exports = function(app) {
    //申请开通
    app.post('/api/applyOpenAccount',controller.applyOpenAccount);
    //判断用户的核心系统是否完成
    app.post('/api/findCustAuth',controller.findCustAuth);

    app.get('/api/protocol',controller.protocol)
    app.get('/api/generateProtocol',controller.generateProtocol)
}
