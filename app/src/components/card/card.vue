<template>
    <div class="card contain" v-if="msg.isLoan">
        <div class="cardNo">{{ msg.cardNo }}</div>
        <div class="limit">可用额度：{{msg.creditAmt}}元</div> 
        <div class="repaymentInfo">
            <div class="repaymentMoney w320">
                <div>本期应还(元)</div>
                <div>{{msg.repayAmount}}</div>
            </div>
            <div class="repaymentDate w320">
                <div>还款日</div>
                <div>{{msg.repayDate}}</div>
            </div>
        </div>
        <div class="computed">本期应还&nbsp;&nbsp;=&nbsp;&nbsp;历史应还&nbsp;&nbsp;+&nbsp;&nbsp;本期账单&nbsp;&nbsp;-&nbsp;&nbsp;本期调整</div>
        <div class="computed" v-if="msg.billAdjustAmt>=0">{{msg.repayAmount}}&nbsp;&nbsp;=&nbsp;&nbsp;{{msg.hisRepayAmount}}&nbsp;&nbsp;+&nbsp;&nbsp;{{msg.billAmount}}&nbsp;&nbsp;-&nbsp;&nbsp;{{msg.billAdjustAmt}}</div>
        <div class="computed" v-else-if="msg.billAdjustAmt&&msg.billAdjustAmt<0">{{msg.repayAmount}}&nbsp;&nbsp;=&nbsp;&nbsp;{{msg.hisRepayAmount}}&nbsp;&nbsp;+&nbsp;&nbsp;{{msg.billAmount}}&nbsp;&nbsp;+&nbsp;&nbsp;{{Math.abs(msg.billAdjustAmt).toFixed(2)}}</div>
    </div>
    <div class="card contain" v-else v-on:click="toCardLink">
        <div class="activeCard shadow" v-if="msg.isOpen == 'N' && !msg.status">
            <a class="button open" v-on:click="this.$parent.applyOpen">立即开通</a>
        </div>
        <div class="openCard shadow" v-else-if="msg.status == 'active'">
            <a v-on:click="this.$parent.isToActive" class="button active">激活</a>
        </div>
        <div class="openCard shadow" v-else-if="msg.pending == 'dealing' && msg.isOpen == 'Y'">
            <p class="deal1">开通请求已受理</p>   
            <p class="deal2">请30分钟后查看审核结果</p>
            <div class="button refresh" v-on:click="this.$parent.refresh">刷新</div>
        </div>
        <div class="openCard shadow" v-else-if="msg.isOpen == 'N' && msg.status == 'fail'"> 
            <p class="deal1" v-if="msg.failmsg" style="width:3.4rem;margin:1.36rem auto 0;line-height:.4rem">{{msg.failmsg}}</p>      
            <p class="deal1" v-if="!msg.failmsg">申请开通失败</p>   
            <p class="deal2" v-if="!msg.failmsg">如有疑问请拨打400-8846-898</p>
            <router-link to="/open" class="button refresh">重新申请</router-link>
        </div>
        <div class="unlock shadow" v-else-if="msg.isLock == 'Y'">
            <img src="./icon/lock.png" alt="">
            <p class="report" v-show="!msg.dealComplete">挂失处理中</p>
        </div>
        <div class="niubei contain"></div>
        <div class="limit" v-show="pageType!=='cardLimit'">可用额度：{{msg.creditAmt}}元</div>
        <div class="limit" v-show="pageType=='cardLimit'">账户类别：{{msg.cardType}}</div>
        <div class="cardNum" v-if="msg.isOpen == 'N'&&!msg.status" v-show="pageType!=='cardLimit'">
            <ul class="userCard">
                <li class="cardNoStyle" v-for="(number,index) in '8888 8888 8888 8888'.split(' ')" v-bind:key="index">{{number}}</li>
            </ul>
        </div>
        <div class="cardNum" v-else-if="msg.cardStatus == 'disActive'&& msg.pending !== 'dealing' && msg.status !== 'fail'" v-show="pageType!=='cardLimit'">
            <ul class="userCard">
                <li class="cardNoStyle" v-for="(number,index) in msg.cardNo.split(' ')" v-bind:key="index">{{number}}</li>
            </ul>
        </div>
        <div class="cardNum" v-else-if="msg.cardStatus == 'active'" v-show="pageType!=='cardLimit'">
            <ul class="userCard">
                <li class="cardNoStyle" v-for="(number,index) in msg.cardNo.split(' ')" v-bind:key="index">{{number}}</li>
            </ul>
        </div>
        <div class="usable-money" v-show="pageType=='cardLimit'">
            <p>年度剩余可消费额度：</p>
            <p>{{msg.reaminAnnualAmt}}</p>
        </div>
        <div class="accountInfo clearfix">
            <div class="money-detail fl w100" v-if="msg.status == 'loan'" v-show="pageType!=='cardLimit'">
                <div class="clearfix w264 fr">
                    <span class="w122">本期应还:</span><span>{{msg.repayAmount}}元</span>
                </div>
                <span class="fl w122">未出账单:</span><span class="fl">{{msg.billAmount}}元</span>            
            </div>
            <div class="indexDate fl w100" v-if="msg.status == 'loan'" v-show="pageType!=='cardLimit'">
                <div class="clearfix w264 fr">
                    <span class="w122">还款日:</span><span>{{msg.repayDate}}</span>
                </div>
                <span class="w122 fl">账单日:</span><span class="fl">{{msg.billDate}}</span>        
            </div>
            <div class="indexDate fl w100" v-else-if="msg.status == 'unloan'" v-show="pageType!=='cardLimit'" style="position: absolute;bottom: .3rem;width: 6.4rem;">
                <span class="fr">还款日：每月{{msg.repayDate}}日</span>
                <span class="fl">账单日：每月{{msg.billDate}}日</span>
            </div>

            <div class="money-detail fl w100" v-show="pageType=='cardLimit'">
                <div class="clearfix w264 fr" style="width:2.8rem">
                    <span class="">可用额度:</span><span>{{msg.usableAmount}}元</span>
                </div>
                <span class="fl">信用额度:</span><span class="fl">{{msg.maxLoanAmt}}元</span>            
            </div>
            <div class="indexDate fl w100" v-show="pageType=='cardLimit'">
                <div class="clearfix fr w264" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width:2.8rem">
                    <span>年度累计支付:</span><span>{{msg.yearAccuLoanAmt}}元</span>
                </div>   
                <span class="fl">年度可消费额度:{{msg.annualAmt}}元</span>    
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'niu-card',
        props: {
            pageType: String,
            default: '',
            isLoan: Boolean,
            msg: ''
        },
        methods:{
            toCardLink(){
                if(this.$parent.toCardLink){
                    this.$parent.toCardLink()
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
        margin-top: 1.2rem;
    }
    
    .detail {
        margin-bottom: .04rem
    }
    
    .cardList {
        background-color: #2e3652;
        height: 6.44rem;
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
        line-height: .86rem;
        color: #c95080;
        font-size: .24rem;
    }

    .w144{
        width: 1.44rem;
    }
    .w100 {
        width: 100%;
        text-align: left;
    }
    
    .w264 {
        width: 2.5rem;
    }

    .w240{
        width: 2.4rem;
        display: inline-block;
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
    
    .card {
        position: relative;
        width: 6.9rem;
        height: 3.56rem;
        margin: 0 auto;
        background: url('icon/card.png') 0 0 no-repeat;
        padding: .28rem 0 .26rem .25rem;
        box-sizing: border-box;
    }
    
    .limit {
        color: #ffffff;
        font-size: .28rem;
        width: 3.3rem;
        line-height: .3rem;
        vertical-align: top;
        text-align: left
    }
    
    .cardNum {
        color: #ffffff;
        font-size: .46rem;
        margin-top: .8rem;
        margin-bottom: .5rem;
        text-align: center;
        padding-right: .26rem;
    }

    .userCard{
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 5.48rem;
    }

    .cardNoStyle {
        display: inline-block;
        text-align: center;
    }

    .usable-money{
        color: #ffffff;
        font-weight: 600;
        margin-top: .7rem;
        margin-bottom: .28rem;
        text-align: center;
        padding-right: .26rem
    }

    .usable-money>p{
        font-size: .24rem;
        font-weight: 400;
        font-family: 'simsun'
    }
    .usable-money>p:nth-child(2){
        font-size: .56rem;
        font-weight: 600
    }
    
    .niubei {
        float: right;
        width: 3.58rem;
        height: .91rem;
        background: url('icon/niubeicredit.png') 0 0 no-repeat;
        margin-top: 0.02rem;
    }
    
    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: .24rem;
        z-index: 999;
        background-color: rgba(0, 0, 0, .4);
    }

    .button {
        display: block;
        width: 1.6rem;
        height: .6rem;
        margin: 2.26rem auto 0;
        font-size: .28rem;
        color: #ffffff;
        line-height: .61rem;
        text-align: center;
        background: url('icon/buttonBorder.png') 0 0 no-repeat;
        background-size: contain;
        -webkit-background-size:contain;
        -moz-background-size: contain;
        -o-background-size: contain;
        -ms-background-size: contain;
    }
    
    .accountInfo {
        color: #ffffff;
        font-size: .24rem;
        padding-right: .06rem;
    }
    
    .detail {
        margin-bottom: .04rem
    }

    .money-detail{
        margin-bottom: .1rem;
    }
    
    .unlock>img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -.7rem;
        margin-left: -.7rem;
        width: 1.4rem
    }
    
    .report {
        color: #ffffff;
        font-size: 0.24rem;
        margin-top: 2.96rem;
    }
    
    .refresh {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 2.5rem auto 0;
    }
    
    .deal1 {
        color: #ffffff;
        font-size: .28rem;
        margin-top: 1.36rem;
        line-height: 1;
    }
    
    .deal2 {
        color: #ffffff;
        font-size: .28rem;
        line-height: 1;
        margin-top: .18rem;
    }
    
    .indexDate {
        
    }
</style>