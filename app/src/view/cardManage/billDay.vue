<template>
  <div>
    <div class="bill-day">
      <div class="bill-day-item">
        <p class="col-white">账单日：</p>
        <p>
          <span>每月</span>
          <span class="font72 col-white">{{ billDate }}</span>
          <span>日</span>
        </p>
      </div>
      <div class="bill-day-item">
        <p class="col-white">还款日：</p>
        <p>
          <span>每月</span>
          <span class="font72 col-white">{{ repayDate }}</span>
          <span>日</span>
        </p>
      </div>
    </div>

    <div class="hint">
      <p>温馨提示：</p>
      <p style="margin-top:.3rem">1.激活时选定账单日后，系统会自动匹配还款日，不可修改。</p>
      <p>2.账单日：当期费用结算日，账单日当天消费计算在当期账单中</p>
    </div>

    <div class="confirm" v-on:click="toCardManage">确认</div>
  </div>
</template>


<script>
  import toast from '../../components/toast/toast.js';
  import utils from '../../utils/utils';
  export default{
    created(){
      var _this = this;
      resource.userInfo({}, function(result) {
          if(result.code == '000000'){
            if(!utils.isEmptyObject(result.data)){
              if(result.data.status == 'loan'){
                  _this.billDate = result.data.billDate.slice(3,5);
                  _this.repayDate = result.data.repayDate.slice(3,5);
              }else{
                  _this.billDate = result.data.billDate;
                  _this.repayDate = result.data.repayDate;
              }
            }else{
              toast({
                  message: "服务器出了一点小故障",
                  iconClass:'warning',
                  duration:'2000'
              })
            }
          }else{
              toast({
                  message: result.msg,
                  iconClass:'warning',
                  duration:'2000'
              })
          }
      })
    },
    data(){
      return {
        billDate: null,
        repayDate: null
      }
    },
    methods: {
      toCardManage(){
        this.$router.push({path : '/card'})
      }
    }
  }
</script>

<style scoped>
  .bill-day{
    display: flex;
    flex-direction:row;
    width: 6.9rem;
    height: 2rem;
    margin: 0.3rem auto;
    font-size: 0.24rem;
    color: #8a8e9c;
    background-color: #353e5d;
    border-radius: 8px;
  }
  .bill-day-item{
    width: 50%;
    margin-top: 0.3rem;
    text-align: center;
    box-sizing: border-box;
  }
  .col-white{
    color: #fff;
  }
  .font72{
    font-size: 0.72rem;
  }
  .confirm{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.92rem;
    line-height: 0.92rem;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    background: url("../../assets/imgs/purple-bg.png");
    background-size: contain;
  }
  .hint{
    margin-top: 0.55rem;
    padding-left: 0.3rem;
    font-size: 0.24rem;
    color:rgba(255,255,255,0.4) ;
    text-align: left;
  }
  .hint p:last-of-type{
    margin-top: 0.3rem;
  }
</style>
