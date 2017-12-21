<template>
    <div>
        <div class="moudle">
            <header>
                <p class="titleNo">01.</p>
                <p class="title">购牛卡功能</p>
            </header>
            <div class="content function">
                <p>购牛卡是向信用良好的用户提供的一项信用支付服务，可实现先购物后还款的类白条功能。</p>
                <p>您申请购牛卡成功后，系统会给出您可使用的信用支付额度，当您在购牛卡支持的平台购物结算时可使用购牛卡进行信用支付，每月的账单日后您可通过牛呗APP查询当月需还款的金额，在还款日前全额还款即可。</p>
                <p>您仅需支付极低的利息及合理的服务费即可享受先购物后付款的完美体验。随着您个人良好信用的累积，信用支付额度会不断增加，实现真正的信用有价值！</p>
            </div>
        </div>
        <div class="moudle">
            <header>
                <p class="titleNo">02.</p>
                <p class="title">申请资格</p>
            </header>
            <div class="content condition">
                <p>1. 18-45岁之间， 大学专科及以上学历;</p>
                <p>2. 注册成为稻垣的用户;</p>
                <p>3. 完成身份认证、学历认证等基础修炼;</p>
                <p>4. 在牛呗有过借款;</p>
            </div>
        </div>
        <div class="moudle">
            <header>
                <p class="titleNo">03.</p>
                <p class="title">申请流程</p>
            </header>
            <div class="content process">
                <p style="text-indent:2em;">只需要完成简单的三个步骤就可以获得一张专属于您本人的信用支付卡，实现在500多家平台的先购物后付款的类白条功能。</p>
                <p>1. 申请开通</p>    
                <p>2. 注册稻垣</p>    
                <p>3. 激活购牛卡</p>    
                <p style="text-indent:2em;">您需要完成以下步骤激活购牛卡，激活后方可在购物平台使用该卡进行信用支付。</p>
                <p>(1) 重置支付密码</p>
                <p>(2) 选择账单日及还款日</p>
            </div>
        </div>
        <div class="moudle">
            <header>
                <p class="titleNo">04.</p>
                <p class="title">信用支付流程</p>
            </header>
            <div class="upLine line"></div>
            <div class="content" style="margin:0 -.28rem">
                <div class="PC">
                    <img src="../../assets/imgs/PC.png" alt="" width="100%">
                </div>
                <div class="mobile">
                    <img src="../../assets/imgs/mobile.png" alt="" width="100%">
                </div>
            </div>
            <div class="downLine line"></div>
        </div>
        <div class="moudle">
            <header>
                <p class="titleNo">05.</p>
                <p class="title">还款流程</p>
            </header>
            <div class="content repayment">
                <p>月账单日（用户在激活购牛卡时选择的），牛呗系统会自动统计您在这个账单周期内使用购牛卡进行信用支付后所需还款的金额。您需要在还款日前将还款金额足额充值，
                并通过还款功能完成还款。逾期不还款将影响您的信用，进而影响您购牛卡的正常使用，请您珍惜信用！</p>
                <p><span style="font-size:.32rem">还款：</span>账单日查看应还款金额→充值→还款</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'notfound',
        data () {
            return {}
        }
    }
</script>
<style scoped>
    .titleNo{
        font-size: 1rem;
        line-height: 1.2rem;
        color: #e35386;
    }
    .title{
        font-size: .28rem;
        color: #fff;
        margin-bottom: .64rem;
    }
    .moudle{
        text-align: left;
        padding: .28rem;
        margin-bottom: 1rem;
    }
    .content{
        font-size: .24rem;
    }
    .function{
        width: 6.93rem;
        height: 5.15rem;
        background: url('../../assets/imgs/background1.png') 0 0 no-repeat;
        background-size: 6.93rem 5.15rem;
        padding: .52rem .32rem
    }
    .condition{
        width: 6.92rem;
        height: 3.36rem;
        background: url('../../assets/imgs/background2.png') 0 0 no-repeat;
        background-size: 6.92rem 3.36rem;
        padding: .87rem .4rem;
    }
    .process{
        width: 6.92rem;
        height: 5.62rem;
        background: url('../../assets/imgs/background3.png') 0 0 no-repeat;
        background-size: 6.92rem 5.62rem;
        padding: .42rem .46rem;
    }
    .repayment{
        width: 6.92rem;
        height: 4.18rem;
        background: url('../../assets/imgs/background5.png') 0 0 no-repeat;
        background-size: 6.92rem 4.18rem;
        padding: .42rem .54rem;
    }
    .function p {
        text-indent: 2em;
        color: #989aa9;
        line-height: .46rem
    }
    .condition p {
        color: #989aa9;
        line-height: .5rem
    }
    .process p{
        color: #989aa9;
        line-height: .48rem
    }
    .repayment p{
        color: #989aa9;
        line-height: .48rem;
        text-indent: 2em
    }
    .line{
        width: 6.22rem;
        height: .22rem;
        
    }
    .upLine{
        background: url('../../assets/imgs/upLine.png') 0 0 no-repeat;
        background-size: 6.22rem .22rem;
    }
    .downLine{
        background: url('../../assets/imgs/downLine.png') 0 0 no-repeat;
        background-size: 6.22rem .22rem;
    }
    .PC{
        margin-top: .24rem;
    }
    .mobile{
        margin-top:.48rem;
        margin-bottom: .24rem
    }
</style>