<template>
    <div class="cardManage">
        <div class="topWrap clearfix">
            <niu-card :msg="msg"></niu-card>
        </div>
        <div class="cardList">
            <ul class="lists">
                <nui-cell :to="{name:'bill'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">账单查询</div>
                </nui-cell>
                <nui-cell :to="{name:'capitalflow'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">资金流水</div>
                </nui-cell>
                <nui-cell :to="{name:'cardLimit'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">卡限额</div>
                </nui-cell>
                <nui-cell :to="{name:'cardList'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">银行卡</div>
                </nui-cell>
                <nui-cell :to="{name:'passWord'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">支付密码</div>
                </nui-cell>
                <nui-cell :to="{name:'billDay'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">账单日</div>
                </nui-cell>
                <nui-cell :to="{name:'report'}" is-link arrows-color="#ffffff" value="">
                    <div slot="left">挂失</div>
                </nui-cell>
            </ul>
        </div>
        <p class="balance" v-if="msg.isLoan">
            本期应还：{{repaymentInfo.repayAmount}}元，还款账户余额：{{repaymentInfo.usableBal}}元
        </p>
        <p class="balance" v-else></p>
        <nui-button type="fill" title="还款" :number="null" is-fill v-if="msg.isLoan&&canRepay" @click.native="submitRepay" :dealing="isDeal"></nui-button>
        <nui-button type="fill" title="还款" :number="null" is-fill isLoan v-else></nui-button>
    </div>
</template>

<script>
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils';
    export default {
        name: 'cardManage',
        created() {
            var _this = this;
            // 用户信息查询
            resource.userInfo({}, function(result) {
                if(result.code == '000000'){
                    // result.data.status = 'unloan';
                    result.data.isLoan = result.data.status == 'unloan' ? false : true;
                    _this.msg = result.data;
                    // 如果用户有借款，查询借款信息
                    if(result.data.isLoan){
                        resource.getRepaymentsInfo({},function(result){
                            if(result.code == '000000'){
                                if(!utils.isEmptyObject(result.data)){
                                    _this.isShow = result.data.isEnough == "N" ? true :false;
                                    // 本期应还
                                    _this.msg.repayAmount = result.data.repayAmount.toFixed(2);
                                    // 历史应还
                                    _this.msg.hisRepayAmount = result.data.hisRepayAmount.toFixed(2);
                                    // 本期账单
                                    _this.msg.billAmount = result.data.billAmount.toFixed(2);
                                    // 本期账单调整
                                    _this.msg.billAdjustAmt = result.data.billAdjustAmt.toFixed(2);
                                    result.data.usableBal = result.data.usableBal.toFixed(2)
                                    _this.repaymentInfo = result.data;
                                    _this.canRepay = result.data.billNos ? true :false;
                                }else{
                                    toast({
                                        message: result.msg
                                    })
                                }
                            }else{
                                toast({
                                    message: result.msg
                                })
                            }
                        })
                    } 
                }else{
                    toast({
                        message: result.msg,
                        position:'',
                        iconClass:'warning',
                        duration:'2000'
                    })
                }
            })
            
        },
        data() {
            return {
                msg: '',
                width: '',
                overflow: '',
                isLoan: false,
                isShow: false,
                repaymentInfo: '',
                canRepay:false,
                isDeal: false,
                flag: true
            }
        },
        methods: {
            submitRepay(){
                var _this = this;
                if(_this.flag){
                    _this.flag = false;
                    _this.isDeal = true;
                    // resource.confirmRepay({},function(result){
                    //     toast({message:result.msg,duration: 2000});
                    //     setTimeout(function() {
                    //         _this.flag = true;
                    //         _this.isDeal = false;
                    //     }, 2000);
                    // })
                    _this.$router.push({"path":"/cardManage/repayment"})
                }
                
            }
        }
    }
</script>

<style scoped>
    .computed {
        color: #fff;
        font-size: .24rem;
        line-height: 1;
        margin-bottom: .22rem;
        padding-right: .25rem;
    }
    
    .w320 {
        width: 3.2rem;
        height: 100%;
        float: left;
        color: #fff;
        line-height: 1
    }
    
    .w320 div:nth-child(1) {
        font-size: .24rem;
        margin-bottom: .18rem
    }
    
    .w320 div:nth-child(2) {
        font-size: .32rem
    }
    
    .w100 {
        width: 100%;
        text-align: left;
    }
    
    .w240 {
        width: 2.64rem;
    }
    
    .w122 {
        width: 1.2rem;
        display: inline-block;
    }
    
    .fl {
        float: left;
    }
    
    .fr {
        float: right;
    }
    
    .hide {
        display: none;
    }
    
    .contain {
        background-size: contain!important;
        -webkit-background-size: contain!important;
        -ms-background-size: contain!important;
    }
    
    .topWrap {
        background-color: #3a4467;
        box-sizing: border-box;
        overflow: hidden;
        margin-top: .3rem;
    }
    
    .accountInfo {
        color: #ffffff;
        font-size: .22rem;
    }
    
    .detail {
        margin-bottom: .04rem
    }
    
    .cardList {
        background-color: #2e3652;
        /* height: 6.44rem; */
        margin-top: .32rem
    }
    
    .cardList .lists {
        width: 100%;
        height: 100%;
        padding: .3rem 0 .6rem;
    }
    
    .cardList .lists>.list {
        width: 100%;
        height: .94rem;
        color: #fff;
        font-size: .3rem;
        line-height: .94rem;
        text-align: left;
        border-bottom: .01rem solid #828697;
    }
    
    .nui-cell-left {
        color: #fff;
        font-size: .26rem;
    }
    
    .cardNo {
        color: #fff;
        font-size: .28rem;
        line-height: 1;
        float: right;
        vertical-align: top;
        margin-right: .25rem;
    }
    
    .repaymentInfo {
        height: .7rem;
        margin-top: .8rem;
        margin-bottom: .4rem;
    }
    
    .balance {
        height: .86rem;
        line-height: .86rem;
        color: #c95080;
        font-size: .24rem;
        margin-bottom: 46px;
    }
</style>
