webpackJsonp([17],{234:function(e,a,t){t(295);var n=t(0)(t(253),t(324),"data-v-633337e4",null);e.exports=n.exports},253:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t(10),o=t(11),r=t.n(o);a.default={name:"bank",data:function(){return{number:0,formdata:{},type:"default",defaultCard:null,bankName:"",bankcardNo:"",mobile:"",smsCode:"",batchNo:"",isDeal:!1,custName:"",certNo:"",supportBank:null,defaultBankCode:"",flag:!0,trueCardNo:""}},created:function(){var e=this;this.type=this.$route.query.type,resource.realInfo({},function(a){e.custName=a.data.custName,e.certNo=r.a.encryption(a.data.certNo)}),resource.getSupportBankInfos({},function(a){"000000"==a.code?e.supportBank=a.data:t.i(n.a)({message:a.msg})}),"default"==this.type&&resource.getAuthBankInfo({},function(a){r.a.isEmptyObject(a.data)?t.i(n.a)({message:"服务器出了一点小故障",position:"",iconClass:"warning",duration:"2000"}):(e.defaultCard=a.data,e.bankName=a.data.bankName,e.trueCardNo=a.data.bankcardNo,e.bankcardNo=r.a.encryption(a.data.bankcardNo),e.mobile=a.data.mobile,e.defaultBankCode=a.data.bankCode)})},computed:{},methods:{getCode:function(){var e=this,a=e.formData,o="default"==e.type?e.trueCardNo:a.cardNo;if(!r.a.isMobile(a.mobile))return void t.i(n.a)("请填写正确的手机号");e.flag&&(e.flag=!1,resource.sendAgentSms({bankCardNo:o,mobile:a.mobile,transType:"ACP_AUTH"},function(a){"000000"==a.code&&(a.data.success?(t.i(n.a)({message:a.msg}),e.batchNo=a.data.data.batchNo,e.number="60-"+Date.now(),setTimeout(function(){e.flag=!0},6e4)):(t.i(n.a)({message:a.msg}),setTimeout(function(){e.flag=!0},2500)))}))},getData:function(e){this.formData=e},formFunc:function(e){var a=this;a.isDeal=!0;for(var o=0;o<a.supportBank.length;o++)a.supportBank[o].dictCode==e.bank&&(e.bankName=a.supportBank[o].dictName);var r="default"==a.type?a.trueCardNo:e.cardNo;resource.repayBankCardActive({bankCardNo:r,mobile:e.mobile,batchNo:a.batchNo,smsCode:e.code,bankName:e.bankName,bankCode:e.bank},function(e){"000000"==e.code?(a.isDeal=!1,a.$router.push({path:"/cardManage/bindResult?bindResult="+e.data.success+"&type="+a.type})):t.i(n.a)({message:e.msg})})}},beforeRouteLeave:function(e,a,t){this.times&&clearInterval(this.times),t()}}},278:function(e,a,t){a=e.exports=t(226)(!1),a.push([e.i,".fr[data-v-633337e4]{float:right}.info[data-v-633337e4]{font-size:.24rem;padding:.24rem .25rem;text-align:left;color:hsla(0,0%,100%,.4)}.form[data-v-633337e4]{background-color:rgba(0,0,0,.2);padding:.2rem 0 .6rem}select[data-v-633337e4]{border:none;color:#fff;background:transparent;-webkit-appearance:none;padding-right:.3rem;font-size:.28rem}",""])},295:function(e,a,t){var n=t(278);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t(227)("2a6b2e26",n,!0)},324:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"info"},[t("span",[e._v(e._s(e.custName))]),e._v("  "),t("span",[e._v(e._s(e.certNo))])]),e._v(" "),t("nui-form",{attrs:{type:"fill","is-fill":"",title:"绑定",dealing:e.isDeal},on:{click:e.formFunc}},["default"==e.type?t("nui-field",{attrs:{name:"bank",label:"选择所属银行",type:"select"}},[t("div",[t("select",{attrs:{name:"bank",disabled:""}},[t("option",{domProps:{value:e.defaultBankCode}},[e._v(e._s(e.bankName))])])])]):t("nui-field",{attrs:{name:"bank",label:"选择所属银行",type:"select","is-link":""}},[t("div",[t("select",{staticClass:"fr",attrs:{name:"bank"}},e._l(e.supportBank,function(a,n){return t("option",{key:n,domProps:{value:a.dictCode}},[e._v(e._s(a.dictName))])}))])]),e._v(" "),"default"==e.type?t("nui-field",{attrs:{name:"cardNo",type:"tel",label:"银行卡卡号",disabled:"",format:"bankcard"},model:{value:e.bankcardNo,callback:function(a){e.bankcardNo=a},expression:"bankcardNo"}}):t("nui-field",{attrs:{name:"cardNo",type:"tel",label:"银行卡卡号",placeholder:"请输入银行卡卡号",format:"bankcard",verify:"number"},model:{value:e.bankcardNo,callback:function(a){e.bankcardNo=a},expression:"bankcardNo"}}),e._v(" "),"default"==e.type?t("nui-field",{attrs:{name:"mobile",type:"tel",label:"银行预留手机号",placeholder:"请输入预留手机",verify:"mobile",disabled:""},model:{value:e.mobile,callback:function(a){e.mobile=a},expression:"mobile"}}):t("nui-field",{attrs:{name:"mobile",type:"tel",label:"银行预留手机号",placeholder:"请输入预留手机",verify:"mobile"},model:{value:e.mobile,callback:function(a){e.mobile=a},expression:"mobile"}}),e._v(" "),t("nui-field",{attrs:{name:"code",label:"手机验证码",placeholder:"请输入手机验证码",verify:"number"},model:{value:e.smsCode,callback:function(a){e.smsCode=a},expression:"smsCode"}},[t("div",{slot:"right"},[t("nui-button",{attrs:{"is-code":"",type:"solid","is-mini":"",title:"获取验证码",number:e.number,unit:"s"},on:{data:e.getData},nativeOn:{click:function(a){e.getCode(a)}}})],1)])],1)],1)},staticRenderFns:[]}}});