<template>
    <div class="reportCard">
        <div class="topWrap clearfix margin80">
             <niu-card :msg="msg"></niu-card>
        </div>
        <nui-button type="empty" title="申请挂失" :number="null"  @click.native="reportLossCard"></nui-button>
        <div class="tips margin50">
            <p class="tal">温馨提示：</p> 
            <p class="tal">1. 如果您发现卡号或密码可能泄露，请立即申请挂失</p>
            <p class="tal">2. 购牛卡申请挂失后将锁定，无法使用此卡进行信用支付</p>
            <p class="tal">3. 其他查询及还款功能不受挂失影响</p>
            <p class="tal">4. 解除挂失状态需人工审核，可联系客服进行解挂操作</p>
            <p class="tal">5. 请您妥善保存好您的卡号及支付密码，避免因泄露带来损失</p>
        </div>
    </div>
</template>
<script>
    import toast from '../../components/toast/toast'
    import utils from '../../utils/utils';
    export default {
        name: 'report',
        created() {
            var _this = this;
            var cardNo;
            resource.userInfo({}, function(result) {
                result.data.repayAmount = utils.toFixed(result.data.repayAmount,2);
                result.data.billAmount = utils.toFixed(result.data.billAmount,2);
                _this.msg = result.data;
                cardNo = result.data.cardNo.replace(/\s/g, "");
                _this.cardNo = cardNo;
            })
        },
        data() {
            return {
                msg: '',
                cardNo: ''
            }
        },
        methods: {
            reportLossCard(){
                var _this = this;
                if(_this.msg.isLock=='N'){
                    resource.reportLossCard({
                        cardNo: _this.cardNo
                    },function(result){
                        toast({message:result.msg})
                        if(result.code=='000000'){
                            if(result.data.success){
                                resource.userInfo({}, function(result) {
                                    _this.msg = result.data;
                                })
                            }
                        }
                    })
                }else{
                    toast({message:"申请挂失中"})
                }
            }
        }
    }
</script>

<style scoped>
    .margin80 {
        margin-bottom: .8rem
    }
    
    .margin50 {
        margin-top: .5rem;
    }
    
    .topWrap {
        background-color: #3a4467;
        box-sizing: border-box;
        overflow: hidden;
        margin-top: .3rem;
    }
    
    .tips {
        padding: .4rem .4rem
    }
    
    .tal {
        text-align: left;
        font-size: .2rem;
        color: #989aa9;
        line-height: .56rem;
    }
</style>