<template>
    <div class="applyOpen">
        <div class="loading" :style="{display:display}">
            <div class="load-icon"></div>
        </div>
        <div class="content">
            <div class="protocol">
                <p>购牛卡是由上海稻垣商务咨询有限公司提供的一项电商在线信用支付服务，可实现先购物后还款的类白条功能。</p>
                <p>您申请购牛卡成功后，系统会给出您可使用的信用支付额度，当您在购牛卡支持的电商平台购物结算时可使用购牛卡进行信用支付，每月的账单日后您可通过牛呗APP查询当月需还款的金额，在还款日前全额还款即可。</p>
                <p>您仅需支付极低的利息及合理的服务费即可享受先购物后付款的完美体验。随着您个人良好信用的累积，信用支付额度会不断增加，实现真正的信用有价值！</p>
                <p>现在注册成为稻垣用户，立即开启“够牛”的信用支付之旅！</p>
            </div>
        </div>
        <div class="agree" >
            <div class="disagree contain" v-on:click="agree(isAgree)" :class="{agreement:isAgree}"></div>
            <span>&nbsp;我已阅读并同意</span>
            <router-link to="/protocol?protType=BIC" class="protocolStyle" style="margin-left:-.1rem">《借款居间协议》</router-link>
            <router-link to="/protocol?protType=FIC" class="protocolStyle margin30">《借款协议》</router-link>
            <router-link to="/protocol?protType=BDFZC" class="protocolStyle margin30">《注册协议》</router-link>
        </div>
        <input type="button" v-if="usable" class="contain" value="申请开通" v-on:click="backIndex">
        <input type="button" v-else class="unable contain" value="申请开通">
    </div>
</template>
<script>
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils';
    export default {
        name: 'index',
        data() {
            return {
                isAgree: true,
                display: "none",
                usable: true
            }
        },
        methods: {
            agree: function(isAgree) {
                if(isAgree){
                    this.isAgree = false;
                    this.usable = false;
                }else{
                    this.isAgree = true;
                    this.usable = true;
                } 
            },
            backIndex: function(){
                if(this.isAgree){
                    var _this = this;
                    _this.display = "block";
                    _this.usable = false;
                    let generateProtocol = new Promise(function(success,fail){
                        resource.generateProtocol({},function (result) { 
                            _this.display = 'none';  
                            if(result.code == '000000'){
                                if(result.data.success){
                                    success()
                                }else{
                                    fail()
                                }
                            }else{
                                toast({message: result.msg})
                                setTimeout(function() {
                                    _this.usable = true;
                                }, 2500);
                            }     
                        })
                    })
                    generateProtocol.then(function () {  
                        resource.applyOpenAccount({},function(result){   
                            if(result.code == '000000'&&!utils.isEmptyObject(result.data)){
                                toast({message: result.data.msg})
                                setTimeout(function() {
                                    _this.$router.push({path:"/"});
                                }, 2500);                       
                            }else{
                                toast({
                                    message: '服务器出了一点小故障'
                                })
                            }
                            setTimeout(function() {
                                _this.usable = true;
                            }, 2500);
                        })
                    },function () {  
                        toast({message: '请先阅读并同意用户协议'});
                        setTimeout(function() {
                            _this.usable = true;
                        }, 2500);
                    })
                }                
            }
        }
    }
</script>
<style scoped>
    .protocol{
        padding: .3rem .3rem;
    }
    .protocol p{
        text-indent: 2em;
        text-align: left;
        color: #ccc;
        font-size: .3rem;
    }
    .contain {
        background-size: contain!important;
        -webkit-background-size: contain!important;
        -ms-background-size: contain!important;
    }
    
    input[type="button"] {
        width: 6.8rem;
        height: 1rem;
        background: url("../../assets/imgs/submit.jpg") 0 0 no-repeat;
        color: #fff;
    }
    .protocolStyle{
        color: #e35386;
    }
    .margin30{
        margin-left: -.3rem;
    }
    .content {
        height: 6.84rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #989aa9;
        font-size: .3rem;
    }
    
    .agree {
        font-size: .26rem;
        color: #989aa9;
        text-align: left;
        padding: 0 .38rem;
        margin-bottom: .4rem;
    }
    
    .disagree {
        display: inline-block;
        width: .3rem;
        height: .3rem;
        vertical-align: bottom;
        background: url('../../assets/imgs/disagree.png') 0 0 no-repeat;
    }

    .unable{
        border-radius: .1rem;
        background-color: #898fa4!important;
        background-image: none!important;
    }
    
    .agreement {
        background-image: url('../../assets/imgs/agree.png')!important;
    }
    
    .disagree>img {
        height: 100%;
    }
    
    .agree span:nth-child(3) {
        color: #e35386;
    }
    .loading{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
        z-index: 9999;
        display: none;
        background-color: rgba(0,0,0,.2);
    }
    .load-icon{
        width: .64rem;
        height: .64rem;
        background-color: rgba(0, 0, 0, .4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: url('../../assets/imgs/loading.gif') 0 0 no-repeat;
        background-size: .64rem .64rem;
    }
</style>