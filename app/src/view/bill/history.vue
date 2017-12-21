<template>
  <div>
    <div v-for="(items,index) in dataList" v-bind:key="index">
      <p class="title" v-text="items.year"></p>
      <div v-for="(item, index) in items.yearList" v-bind:key="index">
          <nui-cell  class="cell" @click.native="showOrder(item)" is-link :arrows-color=" ( item.status == 0 || item.status == 1 ) ? '#e35386' : '#ffffff' " :key="index" >
            <div slot="left">
              <p class="font28" v-text=" item.billDate.slice(5,7) + '月账单' "></p>
              <p class="font28" v-text=" Number(item.billAmount).toFixed(2)"></p>
            </div>
            <div slot="right"  :class="[( item.status == 0 || item.status == 1 ) ? 'purple' : 'white','top5'] " v-text=" mapBillStatus(item.status) "></div>
            <div slot="bottom" v-if="index != (items.yearList.length-1)">
              <div class="cut-off"></div>
            </div>
            <div slot="bottom" v-else></div>
          </nui-cell>
      </div>
    </div>
    <div v-show="show" class="shade"></div>
    <div v-show="show" class="bill-detail">
      <div class="close-btn" @click="hide"></div>
      <div class="bill-title">
        <span v-text="billDetail.billDate">2017.04</span>账单
      </div>
      <div class="bill-content">
        <div>
          <p>账单总金额（元）</p>
          <p v-text="Number(billDetail.billAmount).toFixed(2)">200.20</p>
          <p>记账周期：<span v-text="billDetail.billCycle">02.03-03.03</span></p>
        </div>
        <div>
          <p>还款日</p>
          <p v-text="billDetail.repayDate">03.12</p>
          <p>账单状态：<span :style="{color:(billDetail.status == 0 || billDetail.status == 1) ? '#e35386' : '#fff'}" v-text="mapBillStatus(billDetail.status)">正常结清</span></p>
        </div>
      </div>
      <div class="consumption-record">
        
        <div class="item" v-for="(item,index) in billDetail.orderList" v-bind:key="index">
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
  import toast from "../../components/toast/toast"
  import utils from "../../utils/utils"
  export default{
    data(){
      return {
        dataList:[],
        billDetail:{
          billAmount:0.00,
          billDate:'2017-06-04',
          repayDate:'2017-07-04',
          billCycle:'02.04-03.03',
          status:0,
          orderList:[]
        },
        show:false
      }
    },
    computed:{

    },
    created(){
      var self = this;
      resource.historyBillList({

      },function(result){
         if(result.code='000000'){
           let dataList = [];
           if(utils.isEmptyObject(result.data.billsListMap)){
              toast({message: '暂无历史账单信息'})
           }
           if(!utils.isEmptyObject(result.data.yearList)){
              for( let i=0; i < result.data.yearList.length; i++){
                let item = {};
                item.year = result.data.yearList[i];
                item.yearList = result.data.billsListMap[item.year];
                dataList.push(item);
              }
              for(var i=0;i<dataList.length;i++){
                dataList[i].yearList = dataList[i].yearList.reverse()
              }
              dataList = dataList.reverse();
           }
           self.dataList = dataList;
           
         }
      });
    },
    methods:{
      mapBillStatus(status){
        status = parseInt(status);
        let text = '';
        switch(status)
        {
          case 0:
            text = '待还';
            break;
          case 1:
            text = '逾期';
            break;
          case 2:
            text = '正常结清';
            break;
          case 3:
            text = '逾期结清';
            break;
        }
        return text;
      },
      showOrder(item){
        let self = this;
        this.billDetail.billDate = item.billDate.slice(0,4) + '.' + item.billDate.slice(5,7);
        this.billDetail.billAmount = item.billAmount;
        this.billDetail.repayDate = item.repayDate.slice(5,7) + '.' + item.repayDate.slice(8,10);
        this.billDetail.billCycle = item.nextDay4LastBillDateStr + '-' + item.billDateStr;
        this.billDetail.status = item.status;

        resource.OrderListForBill({
          billNo:item.billNo
        },function(result){
          if(result.code='000000'){
            self.billDetail.orderList = result.data.orderList;
          }
        });
        this.show = true;
      },
      hide(){
        this.show = false;
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
  .top5{
    position: relative;
    top:-0.05rem;
  }
  .cell{
    background-color: #2e3652;
  }
  .title{
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #fff;
    text-align: left;
    text-indent: 0.3rem;
  }
  .font28{
    font-size: 0.28rem;
  }
  .purple{
    margin-right: 0.25rem;
    font-size: 0.28rem;
    color: #e35386;
  }
  .white{
    margin-right: 0.25rem;
    font-size: 0.28rem;
    color: #fff;
  }
  .cut-off{
    position: relative;
    height: 0.28rem;
    background-color: #3a4467;
  }
  .cut-off:before{
    position: absolute;
    top:0;
    left: 0.53rem;
    content: '';
    width: 0.04rem;
    height: 100%;
    background-color:#80869b ;
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
  .bill-detail{
    position: fixed;
    top: 0;
    /*bottom: 0;*/
    left: 0;
    right: 0;
    width: 6.8rem;
    height: 86%;
    margin: 0.4rem auto;
    font-size: 0.24rem;
    color: rgba(255,255,255,0.4);
    border-radius: 4px;
    background-color: #4e5b88;
  }
  .bill-title{
    width: 4.8rem;
    height: 1rem;
    font-size: 0.48rem;
    font-weight: 600;
    margin: 0.4rem auto 0;
    line-height: 1rem;
    border-radius:6px ;
    background-color: #3a4467;
    color: #fff;
  }
  .bill-content{
    display: flex;
    flex-direction: row;
    width: 6.1rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .bill-content div{
    width: 50%;
  }
  .bill-content div p:first-of-type{
    margin-top: 0.3rem;
  }
  .bill-content div p:nth-child(2){
    font-size: 0.48rem;
    color: #fff;
    margin-top: 0.3rem;
  }
  .bill-content div p:last-of-type{
    margin-top: 0.45rem;
    margin-bottom: 0.3rem;
  }
  .consumption-record{
    max-height: 53%;
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

