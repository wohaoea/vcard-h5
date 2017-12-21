<template>
  <div>
    <div class="shadow" v-if="!canRecharge"></div>
    <div class="cardWrap">
      <swiper :options="swiperOption"  ref="mySwiper">  
          <!-- 这部分放你要渲染的那些内容 -->  
          <swiper-slide class="card-item" v-for="(bankCard,index) in repayCard" v-bind:key="index"> 
              <div class="card-info">
                <div class="bank-info">
                  <img class="bank-ico" v-bind:src= "'/share/niuwa-cms/images/xwbank/2x/' + bankCard.bankCode+'.png'"  alt="">
                  <div class="align-left">
                    <p class="bank-name">{{ bankCard.bankName }}</p>
                    <p class="card-type">储蓄卡</p>
                  </div>
                </div>
                <p class="card-no">{{ bankCard.bankcardNo }}</p>
              </div>
              <div class="card-status" v-if="bankCard.isDefault=='Y'">默认</div>
          </swiper-slide>  
      </swiper>  
    </div>
      
    <div class="recharge-info">
      <div class="input-item">
        <span>还款账户余额</span>
        <div>
          <input type="text" readonly="true" :value="usableBal">
          <span>元</span>
        </div>
      </div>
      <div class="input-item">
        <span>充值金额</span>
        <div>
          <input type="number" v-model="rechargeAmount">
          <span class="white">元</span>
        </div>
      </div>
    </div>
    <div class="yzm">
      <nui-form type='fill' is-fill title="充值" @click="formFunc" :dealing="isDeal" :isDisabled="isDisabled">
        <nui-field name="code" label="手机验证码" placeholder="请输入手机验证码" verify="number">
          <div slot="right">
              <nui-button is-code type="solid" is-mini title="获取验证码" :number="seconds" unit="s" @data="getData" @click.native="getCode"></nui-button>
          </div>
        </nui-field>
      </nui-form>
    </div> 
  </div>
</template>
<script>
  import toast from "../../components/toast/toast"
  import utils from "../../utils/utils"
  import loading from '../../components/loading/loading'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    created(){
    },
    components: {  
        swiper,  
        swiperSlide  
    },  
    data () {
        return {
          canRecharge: true,
          isDisabled: false,
          isDeal:false,
          seconds:0,
          formdata:{},
          type: 'default',
          times: null,
          repayCard: null,
          cardListWidth: {},
          usableBal: '',
          rechargeAmt: '',
          swiperOption: {  
              initialSlide: 0,
              pagination: '.swiper-pagination',  
              slidesPerView: 'auto',  
              centeredSlides: true,  
              paginationClickable: true,
              onSlideChangeEnd: swiper => {  
                this.currentCard = this.swiper.activeIndex
              }
          }, 
          swiperSlides: [1, 2, 3, 4],
          currentCard: 0,
          cardNo: '',
          batchNo: '',
          smsCode: '',
          flag: true,
          flag2: true,
          flag3: true,
          acctNo: '',
          rechargeAmount: '',
          lastChargeStatus: 1
        }
    },
    watch:{
        rechargeAmount:function(){
            if(this.rechargeAmount>0){
              this.isDisabled = false
            }else{
              this.isDisabled = true;
            }
        }
    },
    methods:{
      getCode(){
          var data = this.formData
          var _this = this;
          var index = this.currentCard;
          var cardInfo = this.repayCard[index];
          var bankCardNo = this.cardNo[index]; 
          var mobile = cardInfo.mobile;    
          if(_this.flag3){
            _this.flag3 = false
            resource.sendAgentSms({
              bankCardNo : bankCardNo,
              mobile: mobile,
              transType: "ACP_GATHER"
            },function(result){
              if(result.code == '000000'){
                if(result.data.success){
                  toast({"message":result.msg})
                  _this.batchNo = result.data.data.batchNo;
                  _this.seconds = "60-"+Date.now()
                  setTimeout(function() {
                    _this.flag3 = true;
                  }, 60000);
                }else{
                  toast({"message":result.msg})
                  setTimeout(function() {
                    _this.flag3 = true;
                  }, 2500);
                } 
              }
            })
          }
        },
        getData(data){
          this.formData = data;
        },
        formFunc(data){
          var _this = this
          if(this.rechargeAmount>0){
            // 获取当前所选择的卡信息
            var index,cardInfo,bankCardNo,mobile,batchNo,smsCode,bankName,bankCode,_this;
            index = this.currentCard;
            cardInfo = this.repayCard[index];
            bankCardNo = this.cardNo[index]; 
            mobile = cardInfo.mobile;
            batchNo = this.batchNo;
            smsCode = data.code;
            bankName = cardInfo.bankName;
            bankCode = cardInfo.bankCode;
            _this = this;
            _this.isDeal = true;
            loading.open();
            if(_this.flag){
              _this.flag = false;
              resource.rechargeRepay({
                bankCardNo: bankCardNo,
                acctNo: _this.acctNo,
                batchNo: batchNo,
                smsCode: smsCode,
                rechargeAmount: _this.rechargeAmount
              },function(result){
                toast({message:result.data.msg,duration: 2000});
                _this.flag = true;
                if(result.data.success){
                  _this.getLastRechargeInfo(_this);
                }
              })
            }
          }else{
            toast({message:'请输入充值金额'})
          }
        },
        getLastRechargeInfo(_this){
          var count = 0;
          var times = setInterval(function(){
            count++;
            if(count > 5){
              clearInterval(times);
            }else{
                resource.getRechargeInfo({},function(result){
                  if(result.data){
                    if(result.data.lastChargeStatus == 1){
                      resource.getRepaymentsInfo({},function(data){
                        loading.close();
                        clearInterval(times)
                        toast({message: '充值成功',duration: 2500});
                        setTimeout(function() {
                          var path = data.data.billNos ? "/cardManage/repayment" : "/";
                          _this.$router.push({"path": path});
                        }, 2500);
                      })
                    }else if(result.data.lastChargeStatus == 2){
                      loading.close();
                      clearInterval(times)
                      toast({message: '充值失败',duration: 2500});
                      setTimeout(function() {
                        _this.$router.go(0)
                      }, 2500);
                    }
                  }
                })
            }
          },3000)
        }  
    },
    //定义这个swiper对象  
    computed: {  
        swiper() {  
          return this.$refs.mySwiper.swiper;
        }
    },  
    mounted () {  
        //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
        var _this = this;
        this.$nextTick(() => { 
          resource.getRechargeInfo({},function(result){
            if(!utils.isEmptyObject(result.data)){
                _this.acctNo = result.data.acctNo;
                _this.repayCard = result.data.accountBankcard;
                _this.cardNo = [];
                for(let i = 0;i < _this.repayCard.length;i++){
                    _this.cardNo.push(result.data.accountBankcard[i].bankcardNo);
                    _this.repayCard[i].bankcardNo = utils.encryption(_this.repayCard[i].bankcardNo);
                    _this.repayCard[i].bankcardNo = utils.dealCard(_this.repayCard[i].bankcardNo)
                    if(_this.repayCard[i].isDefault == 'Y'){
                      _this.currentCard = i;
                      _this.swiper.slideTo(i)
                    }
                }
                var width = _this.repayCard.length * 6.7 + 0.3;
                _this.cardListWidth = {width: width + 'rem'};
                _this.usableBal = result.data.usableBal ? result.data.usableBal.toFixed(2) : '0.00';
                _this.rechargeAmt = result.data.rechargeAmt
                _this.rechargeAmount = result.data.rechargeAmt ? result.data.rechargeAmt.toFixed(2) : '0.00';
                _this.lastChargeStatus = result.data.lastChargeStatus;
                if(_this.lastChargeStatus == 0){
                    toast({message: '您有一笔订单正在处理中,请稍后充值'});
                    _this.flag = false;
                    _this.isDeal = true;
                    loading.open();
                    _this.getLastRechargeInfo(_this)
                }
            }else{
                _this.canRecharge = false;
                _this.isDisabled = true;
                toast({
                    message: "服务器出了一点小故障",
                    duration:'2000'
                })
            }
          })
        });
    },
    beforeRouteLeave(to, from, next){
        loading.close()
        next();
    }  
  }

</script>


<style scoped>
  .forbidden{
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0
  }
  .fl{
    float: left;
  }
  .cardWrap{
    width: 100%;
    overflow: scroll;
    margin-bottom: .28rem;
    margin-top: .27rem;
  }
  .cardList{
    width: 20.4rem;
    height: 2.4rem;
    display: flex;
    margin-left: .3rem
  }
  .yzm{
    background-color: #2e3652;
  }
  input{
    background-color: #2e3652;
    color: #fff;
    text-align: right;
  }
  .white{
    color: #fff;
  }
  .card-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 6.5rem;
    height: 2.4rem;
    padding: 0.4rem 0.3rem;
    margin: 0 .1rem;
    color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #353e5d;
  }
  .card-item .card-info{
    width: 78%;
  }
  .bank-name{
    font-size: 0.28rem;
  }
  .card-type{
    font-size: 0.2rem;
    margin-top: 0.1rem;
  }
  .card-no{
    font-size: 0.34rem;
    text-indent: 0.85rem;
    margin-top: 0.4rem;
  }
  .bank-info{
    display: flex;
    flex-direction: row;
  }
  .bank-ico{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.25rem;
  }
  .align-left{
    text-align: left;
  }
  .card-status{
    font-size: 0.2rem;
  }

  .recharge-info{
    padding: 0.15rem 0.3rem 0;
    background-color: #2e3652;
  }
  .input-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 7rem;
    height: 0.83rem;
    font-size: 0.28rem;
    color: rgba(255,255,255,0.4);
    border-bottom: 1px solid #828697;
    box-sizing: border-box;
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

  .dealing{
    background-image: none;
    background-color: rgba(255,255,255,0.1);
  }
  .disabled{
    background-image: none;
    background-color: rgba(255,255,255,0.1);
  }
  .shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999
  }
</style>
