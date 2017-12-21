<template>
  <div class="bill-warp">
    <div class="bill-content">
      <div class="content-item">
        <div class="content-info">
          <div class="info-item">
            <p>账单总金额(元)</p>
            <p class="col-white font48" v-text="Number(lastBill.billAmount).toFixed(2)==0?'-':Number(lastBill.billAmount).toFixed(2)">200.12</p>
            <p>记账周期：<span v-text="lastBill.nextDay4LastBillDate + '-' + lastBill.billDate">02/04-03/03</span></p>
          </div>
          <div class="info-item">
            <p>还款日</p>
            <p class="col-white font48" v-text="lastBill.repayDate"></p>
            <p>账单状态：<span :style="{color:(lastBill.billStatus == 0 || lastBill.billStatus == 1) ? '#e35386' : '#fff'}" v-text="lastBill.billStatusName"></span></p>
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
        <div class="content-info">
          <div class="info-item">
            <p>未出账单</p>
            <p class="col-white" v-text="Number(newBill.repayAmount).toFixed(2)==0?'-':Number(newBill.repayAmount).toFixed(2)+'元'"></p>
          </div>
          <div class="info-item">
            <p>账单日</p>
            <p class="col-white" v-text="newBill.billDate==null?'-':newBill.billDate"></p>
          </div>
        </div>
        <p style="margin-top: 0.4rem;">
          <p style="color: #d25081" @click="showOrder">未出账单查询></p>
        </p>
      </div>
    </div>
    <div class="history-bill" @click="jump('/bill/history')">历史账单></div>
    <div class="confirm" v-on:click="toCardManage">确认</div>
    <div class="shade" v-show="isShow"></div>
    <div class="next-bill" v-show="isShow">
      <div class="close-btn" @click="hideBill"></div>
      <div class="bill-title">
        未出账单
      </div>
      <div class="title">
        <span>记账周期：</span>
        <span v-text=" newBill.nextDay4LastBillDate + '-' + newBill.billDate "></span>
      </div>
      <div class="consumption-record">
        <div class="item" v-for="(item,index) in orderList" v-bind:key='index'>
          <div class="category">
            <span>消费时间</span>
            <span>商户平台</span>
            <span>消费金额</span>
            <span>交易类型</span>
          </div>
          <div class="content">
            <span class="col-white" v-text="item.transTime.slice(5,7)+'.'+item.transTime.slice(8,10)"></span>
            <span class="col-white" v-text="item.merchantName"></span>
            <span class="col-white" v-text="Number(item.transAmount).toFixed(2) + '元' "></span>
            <span class="col-white" v-text="item.transTypeName"></span>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import toast from '../../components/toast/toast.js';
  export default{
    data() {
      return {
        lastBill:{
          billAmount:0,
          repayDate:'-',
          nextDay4LastBillDate:'',
          billDate:'',
          billStatusName:'-'
        },
        newBill:{

        },
        orderList:[],
        isShow:false
      }
    },
    created(){
      var self = this;
      resource.billList({

      },function(result){
        if(result.code='000000'){
          if(result.data.lastBill)self.lastBill = result.data.lastBill;
          self.newBill = result.data.newBill;
        }else{
          toast({message: result.msg})
        }
      });
    },
    methods: {
      jump(url){
        window.location.href = url;
      },
      showOrder(){
        let self = this;
        resource.notBillOutOrderList({

        },function(result){
          self.orderList = result.data.orderList;
        });
        this.isShow = true;
      },
      hideBill(){
        this.isShow = false;
      },
      toCardManage(){
        this.$router.push({path:"/card"})
      }
    }
  }
</script>

<style scoped>
  .category,.content{
    width: 100%;
    margin: 0 auto;
    display: flex
  }
  .category{
    height: .6rem;
    line-height: .6rem
  }

  .category > span{
    width: 25%;
  }

  .content > span{
    width: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: .3rem;
    margin-bottom: .16rem;
  }
  .content-item{
    position: relative;
    width: 6.9rem;
    height: 3.2rem;
    margin:0.3rem auto ;
    font-size: 0.24rem;
    border-radius: 8px;
    background-color: #353e5d;
  }
  .bill-warp .content-item:last-of-type{
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
  .bill-warp .content-item:last-of-type .info-item p:first-of-type{
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
  .bill-warp .content-item:last-of-type .holder-container{
    position: absolute;
    top: 0.2rem;
  }
  .bill-warp .content-item:last-of-type .holder-container .holder:before{
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
  .history-bill{
    width: 6.9rem;
    height: 0.8rem;
    margin: 0.2rem auto 0;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    background-color: #353e5d;
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
  .shade{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: #23293e;
    opacity:0.8;
  }
  .next-bill{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 6.8rem;
    height: 78%;
    margin: 0.4rem auto;
    font-size: 0.24rem;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    border-radius: 4px;
    background-color: #4e5b88;
  }
  .next-bill .bill-title{
    width: 4.8rem;
    height: 1rem;
    font-size: 0.48rem;
    margin: 0.4rem auto 0;
    line-height: 1rem;
    border-radius:6px ;
    background-color: #3a4467;
    color: #fff;
  }
  .next-bill .title{
    margin: 0.55rem auto 0.4rem;
  }
  .consumption-record{
    max-height: 65%;
    overflow: scroll;
  }
  .consumption-record .item{
    width: 6rem;
    margin: 0 auto;
    border-top:1px solid #7a819c;
    box-sizing: border-box;
  }
  .close{
    position: absolute;
    width: 0.68rem;
    height: 0.68rem;
    bottom: -0.98rem;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .close-btn{
    width: 1rem;
    height: 1rem;
    background: url('../../assets/imgs/closeBtn.png') 0 0 no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    background-size: 1rem 1rem;
  }
</style>
