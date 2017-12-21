<template>
  <div class="repayment-wrap">
    <div class="repayment-content">
      <div class="content-item">
        <div class="content-info">
          <div class="info-item">
            <p>应还总金额(元)</p>
            <p class="col-white font48">{{repaymentInfo.repayAmount}}</p>
          </div>
          <div class="info-item">
            <p>还款日</p>
            <p class="col-white font48">{{repaymentInfo.repayDate}}</p>
          </div>
        </div>
        <div class="formula">
          <div>
            <p>本期应还</p>
            <p>{{repaymentInfo.repayAmount}}</p>
          </div>
          <div>
            <p>=</p>
            <p>=</p>
          </div>
          <div>
            <p>历史应还</p>
            <p>{{repaymentInfo.hisRepayAmount}}</p>
          </div>
          <div>
            <p>+</p>
            <p>+</p>
          </div>
          <div>
            <p>本期账单</p>
            <p>{{repaymentInfo.billAmount}}</p>
          </div>
          <div>
            <p>-</p>
            <p v-if="repaymentInfo.billAdjustAmt>=0">-</p>
            <p v-else>+</p>
          </div>
          <div>
            <p>本期调整</p>
            <p v-show="repaymentInfo.billAdjustAmt">{{Math.abs(repaymentInfo.billAdjustAmt).toFixed(2)}}</p>
          </div>
        </div>
        <div class="holder-container">
          <div class="holder"></div>
          <div class="holder"></div>
        </div>
      </div>

      <div class="content-item">
        <div class="holder-container">
          <div class="holder"></div>
          <div class="holder"></div>
        </div>
        <div class="account-balance">
          <span>还款账户余额</span>
          <span class="col-white">{{repaymentInfo.usableBal}}</span>
        </div>

      </div>
    </div>
    <div class="lack-balance" v-if="isShow" v-on:click="toRecharge">还款账户余额不足，请充值></div>
    <div class="confirm" v-on:click="submitRepay" v-if="canRepay">确认还款</div>
    <div class="confirm disabled" v-else>确认还款</div>
  </div>
</template>


<script>
  import toast from '../../components/toast/toast';
  import utils from '../../utils/utils';
  export default{
    created(){
        var _this = this;
        resource.getRepaymentsInfo({},function(result){
            if(result.code == '000000'){
                if(!utils.isEmptyObject(result.data)){
                    _this.isShow = result.data.isEnough == "N" ? true :false;
                    result.data.repayAmount = result.data.repayAmount.toFixed(2);
                    result.data.hisRepayAmount = result.data.hisRepayAmount.toFixed(2);
                    result.data.billAmount = result.data.billAmount.toFixed(2);
                    result.data.billAdjustAmt = result.data.billAdjustAmt.toFixed(2);
                    result.data.usableBal = result.data.usableBal.toFixed(2)
                    if(result.data.billNos){
                      _this.canRepay = true;
                    }else{
                      _this.canRepay = false;
                    }
                    _this.repaymentInfo = result.data;
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
    },
    data() {
      return {
        isShow:false,
        repaymentInfo: {},
        flag:true,
        canRepay: false
      }
    },
    mounted(){
      
    },
    methods: {
      submitRepay(event){
        var _this = this;
        var currentDom = event.currentTarget;
        if(!this.isShow){
          // 可以还款，调用还款接口
          if(_this.flag){
            _this.flag = false;
            currentDom.className = "confirm dealing"
            currentDom.innerHTML = '处理中'
            resource.confirmRepay({},function(result){
                toast({message:result.msg,duration: 2000});
                if(result.code == '000000' && !utils.isEmptyObject(result.data)){
                    if(result.data.success){
                        // 还款成功回到首页
                        _this.$router.push({path: "/"})
                    }else{
                        // 还款失败刷新页面
                        setTimeout(function() {
                            _this.$router.go(0)
                        }, 2000);     
                    }
                }
                setTimeout(function() {
                    _this.flag = true
                    currentDom.className = "confirm";
                    currentDom.innerHTML = '确认还款'
                }, 2000);
            })
          }
        }else{
          toast({message: "还款账户余额不足，请充值"})
        }
      },
      toRecharge(){
        var _this = this
        resource.getBankInfo({},function(result){
            if(result.data.data.length !== 0){
                //跳转充值页面
                _this.$router.push({path:"/cardManage/recharge"})
            }else{
                toast({
                    message: "暂无绑定的银行卡",
                    position:'',
                    iconClass:'warning',
                    duration:'1500'
                })
                //跳转到银行卡管理页面
                setTimeout(function() {
                    _this.$router.push({path:"/cardManage/list"})
                }, 1500);     
            }
        })
      }
    }
  }
</script>

<style scoped>
  .content-item{
    position: relative;
    width: 6.9rem;
    height: 4.46rem;
    margin:0 auto ;
    font-size: 0.24rem;
    border-radius: 8px;
    background-color: #353e5d;
  }
  .repayment-wrap .content-item:last-of-type{
    height: 1.7rem;
    margin-top: 0.2rem;
    font-size: 0.28rem;
  }
  .content-info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .info-item{
    width: 50%;
    text-align: center;
    color:#8a8e9c;
    box-sizing: border-box;
  }
  .info-item p{
    margin-top: 0.3rem;
  }
  .info-item p:nth-child(2){
    margin-top: 0.32rem;
  }
  .info-item p:last-of-type{
    margin-top: 0.35rem;
  }
  .repayment-wrap .content-item:last-of-type .info-item p:first-of-type{
    margin-top: 0.8rem
  }
  .col-white{
    color: #fff;
  }
  .font48{
    font-size: 0.48rem;
  }
  .holder-container{
    position: absolute;
    bottom: 0.2rem;
    width: 100%;
    height: 0.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0.4rem;
  }
  .repayment-wrap .content-item:last-of-type .holder-container{
    position: absolute;
    top: 0.2rem;
  }
  .repayment-wrap .content-item:last-of-type .holder-container .holder:before{
    content: '';
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
    width: 0.2rem;
    height: 1.2rem;
    border-radius: 10px;
    background-color: #4e5b88;
  }
  .holder{
    position: relative;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #262c41;
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
  .formula{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 5.6rem;
    margin: 0.7rem auto 0;
    text-align: center;
    font-size: 0.24rem;
    color: #fff;
  }
  .formula p:last-of-type{
    margin-top: 0.18rem;
  }
  .account-balance{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 5.7rem;
    padding-top: 0.95rem;
    margin: 0 auto ;
    color: rgba(255,255,255,0.4);
  }
  .lack-balance{
    display: block;
    margin-top: 0.58rem;
    font-size: 0.28rem;
    color: #e35386;
  }

  .dealing{
    background-image: none;
    background-color: rgba(255,255,255,0.1);
  }

  .disabled{
    background-image: none;
    background-color: rgba(255,255,255,0.1);
  }
</style>
