/**
 * Created by Administrator on 2016/6/20.
 */
import Vue from 'vue'
import axios from 'axios'
import utils from '../utils/utils'

var outExports = {};

var models = {};

var domains = "/api"
if (window.location.port == "8080") {
    domains = window.location.protocol + "//" + window.location.hostname + ":5200/api"
    axios.defaults.withCredentials = true
}

var getMethods = {
    billList:domains + '/bill/billList',
    notBillOutOrderList:domains + '/bill/notBillOutOrderList',
    OrderListForBill:domains + '/bill/OrderListForBill',
    historyBillList:domains + '/bill/historyBillList',
    getUserPwdStatus: domains + '/getUserPwdStatus',
    setDate: domains + '/setDate',
    getRepaymentsInfo: domains + '/getRepaymentsInfo',
    confirmRepay: domains + '/confirmRepay',
    realInfo: domains + '/realInfo',
    getSupportBankInfos: domains + '/getSupportBankInfos',
    findCardInfo: domains + '/findCardInfo',
    getActivityInfo: domains + '/getActivityInfo',
    merchantName: domains + '/merchantName',
    protocol: domains + '/protocol',
    generateProtocol: domains + '/generateProtocol',
    getCustFlows: domains + '/bill/getCustFlows'
};

var postMethods = {
    userInfo: domains + "/userInfo",
    activeCard: domains + "/activeCard",
    SMS: domains + '/SMS',
    merchantList: domains + '/merchantList',
    applyOpenAccount: domains + '/applyOpenAccount',
    resetPayPassword: domains + '/resetPayPassword',
    selectDate: domains + '/selectDate',
    findOneBySign:domains + '/findOneBySign',
    handleUpdatePasswordSuccess: domains + '/handleUpdatePasswordSuccess',
    findCustAuth: domains + '/findCustAuth',
    getBankInfo: domains + '/getBankInfo',
    getAuthBankInfo: domains + '/getAuthBankInfo',
    sendAgentSms: domains + '/sendAgentSms',
    repayBankCardActive: domains + '/repayBankCardActive',
    getRechargeInfo: domains + '/getRechargeInfo',
    rechargeRepay: domains + '/rechargeRepay',
    setDefaultBankcard: domains + '/setDefaultBankcard',
    reportLossCard: domains + '/reportLossCard',
    sendPhoneCode: domains + '/sendPhoneCode',
    checkPhoneCode: domains + '/checkPhoneCode'
};

var jsonpMethods = {};

function turnJson(json) {
    return json;
}

function httpError(response, callback) {
    if (response.status == 200) {
        requestError(response.data, callback)
    }
    if (response.status == 404) {
        callback.call('', "404")
    }
}

function requestError(data, callback) {
    callback.call('', data)
}

Object.keys(getMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.get(getMethods[key], {params:newJson}).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

Object.keys(postMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.post(postMethods[key], newJson).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

Object.keys(jsonpMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.jsonp(jsonpMethods[key], newJson).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

export default outExports;
