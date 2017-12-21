<template>
    <div class="">
        <div class="clearfix capitalflow" v-for="(rechargeFlow,index) in rechargeFlows" v-bind:key="index">
            <div class="category fl fontstyle" v-show="rechargeFlow.transType=='T003'">充值</div>
            <div class="category fl fontstyle" v-show="rechargeFlow.transType=='T004'">提现</div>
            <div class="category fl fontstyle" v-show="rechargeFlow.transType=='T028'">退货</div>
            <div class="content">
                <div class="recordTime w33 fl h100">
                    <h1 class="fontstyle title">申请时间</h1>
                    <div class="date fontstyle28">{{rechargeFlow.applyTime}}</div>
                </div>
                <div class="money w33 fl h100">
                    <h1 class="fontstyle title">金额</h1>
                    <div class="amount fontstyle28">{{rechargeFlow.transAmt}}元</div>
                </div>
                <div class="status w33 fl h100">
                    <h1 class="fontstyle title">处理状态</h1>
                    <div class="accountStatus fontstyle28" v-bind:style="color(rechargeFlow.dealStatus)">
                        {{rechargeFlow.dealStatus}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import toast from '../../components/toast/toast'
    import utils from '../../utils/utils';
    export default {
        name: 'capitalflow',
        created() {
            var _this = this;
            resource.getCustFlows({},function(result){
                if(result.code == '000000'){
                    if(result.data.rechargeFlows){
                        if(result.data.rechargeFlows.length == 0){
                            toast({message: '暂无资金流水记录'})
                        }else{
                            _this.rechargeFlows = result.data.rechargeFlows;
                        }           
                    }else{
                        toast({message: '暂无资金流水记录'})
                    }
                }else{
                    toast({message:result.msg})
                }
            })
        },
        data() {
            return {
                rechargeFlows: null
            }
        },
        methods: {
            color:function(data){
                if(data=='失败'){
                    return {"color":"#da5183"}
                }else if(data=='成功'){
                    return {"color":"#fff"}
                }
            }
        }
    }
</script>

<style scoped>
    .h100{
        height: 100%;
    }
    .fl{
        float: left;
    }
    .fontstyle{
        font-size: .32rem;
        color: #fff;
    }
    .fontstyle28{
        font-size: .28rem;
        color: #989ba5
    }
    .w33{
        width: 33.333%;
    }
    .capitalflow{
        height: 1.42rem;
        background-color: #2e3652;
        margin-top: .25rem;
        position: relative;
    }
    .category{
        width: .9rem;
        height: 100%;
        padding: .36rem .27rem;
        box-sizing: border-box;
        line-height: .34rem
    }
    .capitalflow::before{
        position: absolute;
        content: '';
        width: .04rem;
        height: .25rem;
        top: -.25rem;
        left: .4rem;
        background-color: #80869b;
    }
    .capitalflow:nth-child(1)::before{
        display: none;
        position: static;
    }
    .content{
        margin-left: .9rem;
        height: 100%;
    }
  
    .recordTime .title{
        margin-bottom: .08rem
    }
    .money .title{
        margin-bottom: .44rem
    }
    .status .title{
        margin-bottom: .44rem
    }
    .title{
        padding-top: .18rem;
        line-height: .32rem
    }

</style>