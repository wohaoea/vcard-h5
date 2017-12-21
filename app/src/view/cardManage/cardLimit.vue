<template>
    <div class="cardLimit">
        <div class="topWrap clearfix margin80">
             <niu-card :msg="msg" :pageType="pageType"></niu-card>
        </div>
        <div class="tips margin50">
            <p class="tal">卡限额说明：</p> 
            <p class="tal">1. 购牛卡按年累计可消费额度分为一类、二类和三类，各卡类年累计可消费额度如下：</p>
            <p class="tal">一类： 年1000元; &nbsp;&nbsp;二类： 年10万元; &nbsp;&nbsp;三类： 20万</p>
            <p class="tal">2. 可用额度=MIN（剩余信用额度，年度剩余可消费额度）</p>
            <p class="tal">例如剩余信用额度为1500元，年度剩余可消费额度为55000元，则可用额度为1500元</p>
        </div>
        <nui-button type="fill" title="确认" :number="null" is-fill @click.native="toCardManage"></nui-button>
    </div>
</template>
<script>
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils';
    export default {
        created() {
            var _this = this;
            resource.findCardInfo({}, function(result) {
                if(result.code == '000000' && !utils.isEmptyObject(result.data)){
                    _this.msg = result.data;
                }else{
                    toast({message: result.msg})
                }
            })
        },
        data(){
            return {
                pageType: 'cardLimit',
                msg: {
                    isLoan: false
                }
            }
        },
        methods: {
            toCardManage(){
                this.$router.push({path:"/card"})
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
        margin-bottom: 1rem;
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
        font-size: .24rem;
        color: #989aa9;
        line-height: .6rem;
    }
</style>