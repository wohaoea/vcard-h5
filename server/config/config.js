//应用配置文件
var path = require('path');

var _ = require('underscore');
var argv2 = process.argv[2];

var local = require('./config-'+argv2);
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "vcard",
    //端口号配置
    "port": 5200,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": '/usr/local/log/nodejs',
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'../../', 'public'),
    
};

config = _.extend(config,local);


module.exports = config;
