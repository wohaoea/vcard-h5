webpackJsonp([7],{247:function(a,e,t){t(298);var i=t(0)(t(266),t(327),"data-v-9132adb2",null);a.exports=i.exports},249:function(a,e){a.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAGCAMAAACrS+s+AAAANlBMVEXYVc2aYeDUVs6eYN/RV8+XYuGuXdqiYN6mX9y/WtWzXNjDWdOqXtvNV9C3XNfHWNK7W9bKWNHvqKV7AAAB2klEQVRYw7WXUXLCMAxESwLBgSZ17n/Zrq2FtEy8kofhSVqFfr/RuF9vMJQCCI/zcI6zcC2YJhtXkx+X+x3TZn7sGe2S54zWrHmV3G4rqqRmmjBhvtGSZJES0ufax3gduzgFuQD7wGeYPr9fCkBljuZcByVZapVYbEndMZvQfZOqo5Bt5+en6nXXj4bnD7TovuxMpftUCgtp4FdTc1ZBy55QWnE2ynxPWvC98Fvb/VJcUefRXcK/ddeL7dY+Xcfdc900xxKnfdO6o0sBZAsYXiNAziUk66qd17cdXu/H3SxHRHDuurmOCEHv2RqYzgxcdcsaYIz6jvnYda9hxb8UsFzZa4ZlxwSMd647RsvOC9/iediDvpdW591SH3fnKTOxKHsZ+YYpQd2npvLJvPcs/1toZftYB0XnO+572HS+YxA99D5kuPYDjxU57TTeld1Gv2XItrMcX3i0EJ6ml5TKz1X5I+uzReYv/+VeW153/ZDZv/VbhsJbaNlpfMKELvsuujJ+5PJv++lAfnRc+MsHHjPDv280Kwbf7APakZ1QeWU8FEfo6y5kx1hp1ZHOP6vZkt63TH82dBeyl6WZHsWlgeYIjJDdIix7/bjWTu7j3dp1/cQSoivb0VF+AesChu/0ClphAAAAAElFTkSuQmCC"},266:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t(10),r=t(11),s=t.n(r),n=t(55),o=t(29);t.n(o);e.default={created:function(){},components:{swiper:o.swiper,swiperSlide:o.swiperSlide},data:function(){var a=this;return{canRecharge:!0,isDisabled:!1,isDeal:!1,seconds:0,formdata:{},type:"default",times:null,repayCard:null,cardListWidth:{},usableBal:"",rechargeAmt:"",swiperOption:{initialSlide:0,pagination:".swiper-pagination",slidesPerView:"auto",centeredSlides:!0,paginationClickable:!0,onSlideChangeEnd:function(e){a.currentCard=a.swiper.activeIndex}},swiperSlides:[1,2,3,4],currentCard:0,cardNo:"",batchNo:"",smsCode:"",flag:!0,flag2:!0,flag3:!0,acctNo:"",rechargeAmount:"",lastChargeStatus:1}},watch:{rechargeAmount:function(){this.rechargeAmount>0?this.isDisabled=!1:this.isDisabled=!0}},methods:{getCode:function(){var a=(this.formData,this),e=this.currentCard,r=this.repayCard[e],s=this.cardNo[e],n=r.mobile;a.flag3&&(a.flag3=!1,resource.sendAgentSms({bankCardNo:s,mobile:n,transType:"ACP_GATHER"},function(e){"000000"==e.code&&(e.data.success?(t.i(i.a)({message:e.msg}),a.batchNo=e.data.data.batchNo,a.seconds="60-"+Date.now(),setTimeout(function(){a.flag3=!0},6e4)):(t.i(i.a)({message:e.msg}),setTimeout(function(){a.flag3=!0},2500)))}))},getData:function(a){this.formData=a},formFunc:function(a){var e=this;if(this.rechargeAmount>0){var r,s,o,d,c,e;r=this.currentCard,s=this.repayCard[r],o=this.cardNo[r],s.mobile,d=this.batchNo,c=a.code,s.bankName,s.bankCode,e=this,e.isDeal=!0,n.a.open(),e.flag&&(e.flag=!1,resource.rechargeRepay({bankCardNo:o,acctNo:e.acctNo,batchNo:d,smsCode:c,rechargeAmount:e.rechargeAmount},function(a){t.i(i.a)({message:a.data.msg,duration:2e3}),e.flag=!0,a.data.success&&e.getLastRechargeInfo(e)}))}else t.i(i.a)({message:"请输入充值金额"})},getLastRechargeInfo:function(a){var e=0,r=setInterval(function(){e++,e>5?clearInterval(r):resource.getRechargeInfo({},function(e){e.data&&(1==e.data.lastChargeStatus?resource.getRepaymentsInfo({},function(e){n.a.close(),clearInterval(r),t.i(i.a)({message:"充值成功",duration:2500}),setTimeout(function(){var t=e.data.billNos?"/cardManage/repayment":"/";a.$router.push({path:t})},2500)}):2==e.data.lastChargeStatus&&(n.a.close(),clearInterval(r),t.i(i.a)({message:"充值失败",duration:2500}),setTimeout(function(){a.$router.go(0)},2500)))})},3e3)}},computed:{swiper:function(){return this.$refs.mySwiper.swiper}},mounted:function(){var a=this;this.$nextTick(function(){resource.getRechargeInfo({},function(e){if(s.a.isEmptyObject(e.data))a.canRecharge=!1,a.isDisabled=!0,t.i(i.a)({message:"服务器出了一点小故障",duration:"2000"});else{a.acctNo=e.data.acctNo,a.repayCard=e.data.accountBankcard,a.cardNo=[];for(var r=0;r<a.repayCard.length;r++)a.cardNo.push(e.data.accountBankcard[r].bankcardNo),a.repayCard[r].bankcardNo=s.a.encryption(a.repayCard[r].bankcardNo),a.repayCard[r].bankcardNo=s.a.dealCard(a.repayCard[r].bankcardNo),"Y"==a.repayCard[r].isDefault&&(a.currentCard=r,a.swiper.slideTo(r));var o=6.7*a.repayCard.length+.3;a.cardListWidth={width:o+"rem"},a.usableBal=e.data.usableBal?e.data.usableBal.toFixed(2):"0.00",a.rechargeAmt=e.data.rechargeAmt,a.rechargeAmount=e.data.rechargeAmt?e.data.rechargeAmt.toFixed(2):"0.00",a.lastChargeStatus=e.data.lastChargeStatus,0==a.lastChargeStatus&&(t.i(i.a)({message:"您有一笔订单正在处理中,请稍后充值"}),a.flag=!1,a.isDeal=!0,n.a.open(),a.getLastRechargeInfo(a))}})})},beforeRouteLeave:function(a,e,t){n.a.close(),t()}}},281:function(a,e,t){e=a.exports=t(226)(!1),e.push([a.i,".forbidden[data-v-9132adb2]{width:100%;height:100%;z-index:999;position:fixed;left:0;top:0}.fl[data-v-9132adb2]{float:left}.cardWrap[data-v-9132adb2]{width:100%;overflow:scroll;margin-bottom:.28rem;margin-top:.27rem}.cardList[data-v-9132adb2]{width:20.4rem;height:2.4rem;display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:.3rem}.yzm[data-v-9132adb2],input[data-v-9132adb2]{background-color:#2e3652}input[data-v-9132adb2]{color:#fff;text-align:right}.white[data-v-9132adb2]{color:#fff}.card-item[data-v-9132adb2]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:6.5rem;height:2.4rem;padding:.4rem .3rem;margin:0 .1rem;color:#fff;border-radius:8px;box-sizing:border-box;background-color:#353e5d}.card-item .card-info[data-v-9132adb2]{width:78%}.bank-name[data-v-9132adb2]{font-size:.28rem}.card-type[data-v-9132adb2]{font-size:.2rem;margin-top:.1rem}.card-no[data-v-9132adb2]{font-size:.34rem;text-indent:.85rem;margin-top:.4rem}.bank-info[data-v-9132adb2]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.bank-ico[data-v-9132adb2]{width:.8rem;height:.8rem;margin-right:.25rem}.align-left[data-v-9132adb2]{text-align:left}.card-status[data-v-9132adb2]{font-size:.2rem}.recharge-info[data-v-9132adb2]{padding:.15rem .3rem 0;background-color:#2e3652}.input-item[data-v-9132adb2]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:7rem;height:.83rem;font-size:.28rem;color:hsla(0,0%,100%,.4);border-bottom:1px solid #828697;box-sizing:border-box}.confirm[data-v-9132adb2]{position:fixed;bottom:0;width:100%;height:.92rem;line-height:.92rem;text-align:center;font-size:.32rem;color:#fff;background:url("+t(249)+");background-size:contain}.dealing[data-v-9132adb2],.disabled[data-v-9132adb2]{background-image:none;background-color:hsla(0,0%,100%,.1)}.shadow[data-v-9132adb2]{width:100%;height:100%;position:fixed;top:0;left:0;z-index:99999}",""])},298:function(a,e,t){var i=t(281);"string"==typeof i&&(i=[[a.i,i,""]]),i.locals&&(a.exports=i.locals);t(227)("138a3de8",i,!0)},327:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[a.canRecharge?a._e():t("div",{staticClass:"shadow"}),a._v(" "),t("div",{staticClass:"cardWrap"},[t("swiper",{ref:"mySwiper",attrs:{options:a.swiperOption}},a._l(a.repayCard,function(e,i){return t("swiper-slide",{key:i,staticClass:"card-item"},[t("div",{staticClass:"card-info"},[t("div",{staticClass:"bank-info"},[t("img",{staticClass:"bank-ico",attrs:{src:"/share/niuwa-cms/images/xwbank/2x/"+e.bankCode+".png",alt:""}}),a._v(" "),t("div",{staticClass:"align-left"},[t("p",{staticClass:"bank-name"},[a._v(a._s(e.bankName))]),a._v(" "),t("p",{staticClass:"card-type"},[a._v("储蓄卡")])])]),a._v(" "),t("p",{staticClass:"card-no"},[a._v(a._s(e.bankcardNo))])]),a._v(" "),"Y"==e.isDefault?t("div",{staticClass:"card-status"},[a._v("默认")]):a._e()])}))],1),a._v(" "),t("div",{staticClass:"recharge-info"},[t("div",{staticClass:"input-item"},[t("span",[a._v("还款账户余额")]),a._v(" "),t("div",[t("input",{attrs:{type:"text",readonly:"true"},domProps:{value:a.usableBal}}),a._v(" "),t("span",[a._v("元")])])]),a._v(" "),t("div",{staticClass:"input-item"},[t("span",[a._v("充值金额")]),a._v(" "),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.rechargeAmount,expression:"rechargeAmount"}],attrs:{type:"number"},domProps:{value:a.rechargeAmount},on:{input:function(e){e.target.composing||(a.rechargeAmount=e.target.value)},blur:function(e){a.$forceUpdate()}}}),a._v(" "),t("span",{staticClass:"white"},[a._v("元")])])])]),a._v(" "),t("div",{staticClass:"yzm"},[t("nui-form",{attrs:{type:"fill","is-fill":"",title:"充值",dealing:a.isDeal,isDisabled:a.isDisabled},on:{click:a.formFunc}},[t("nui-field",{attrs:{name:"code",label:"手机验证码",placeholder:"请输入手机验证码",verify:"number"}},[t("div",{slot:"right"},[t("nui-button",{attrs:{"is-code":"",type:"solid","is-mini":"",title:"获取验证码",number:a.seconds,unit:"s"},on:{data:a.getData},nativeOn:{click:function(e){a.getCode(e)}}})],1)])],1)],1)])},staticRenderFns:[]}}});