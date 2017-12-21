<template>
    <div>   
        <div class="card-list" v-if="bankcardNo">
            <div class="card-item">
                <div class="card-info">
                    <div class="bank-info">
                        <img class="bank-ico" v-bind:src="'/share/niuwa-cms/images/xwbank/2x/'+defaultCard.bankCode+'.png'" alt="">
                        <div class="align-left">
                            <p class="bank-name">{{bankName}}</p>
                            <p class="card-type">储蓄卡</p>
                        </div>
                    </div>
                    <p class="card-no">{{bankcardNo}}</p>
                </div>
                <div class="card-status" v-on:click="toDefualtBind">
                    <span>绑定</span>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="card-list" v-for="(repayCard,index) in repayCard" v-bind:key="index">
            <div class="card-item">
                <div class="card-info">
                    <div class="bank-info">
                        <img class="bank-ico" v-bind:src="'/share/niuwa-cms/images/xwbank/2x/'+repayCard.bankCode+'.png'" alt="">
                        <div class="align-left">
                            <p class="bank-name">{{repayCard.bankName}}</p>
                            <p class="card-type">储蓄卡</p>
                        </div>
                    </div>
                    <p class="card-no">{{repayCard.bankcardNo}}</p>
                </div>
                <div class="card-status" v-bind:data-no="index" v-if="repayCard.isDefault == 'Y'">
                    <span>默认</span>
                </div>
                <div class="card-status" v-bind:data-no="index" v-else >
                    <span v-on:click="setDefaultBankcard(index)">设为默认卡</span>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <img class="add-card" src="../../assets/imgs/add-card.png" alt="" v-on:click="toNewBind">
    </div>
</template>

<script>
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils';
    export default{
        created(){
            var _this = this; 
            resource.getBankInfo({},function(result){
                if(result.data){
                    _this.commonCardNo = result.data.commonCardNo
                    _this.repayCard = result.data.data;
                    if(_this.repayCard.length == 0){
                        resource.getAuthBankInfo({},function(result){
                            if(!utils.isEmptyObject(result.data)&&result.data.bankcardNo){
                                _this.defaultCard = result.data;
                                _this.bankName =  result.data.bankName;
                                // 对银行卡进行脱敏处理
                                result.data.bankcardNo = utils.encryption(result.data.bankcardNo)
                                // 每四位加上空格
                                result.data.bankcardNo = utils.dealCard(result.data.bankcardNo)
                                _this.bankcardNo =result.data.bankcardNo;
                            }else if(!result.data.bankCardNo){
                                toast({
                                    message: result.msg
                                })
                            }else{
                                toast({message: "服务器出了一点小故障"})
                            }
                        });
                    }
                }else{
                    toast({
                        message: "服务器出了一点小故障",
                        position:'',
                        iconClass:'warning',
                        duration:'2000'
                    })
                }
            })
        },
        data(){
            return {
                defaultCard: null,
                repayCard: null,
                bankName: '',
                bankcardNo: '',
                commonCardNo: ''
            }
        },
        methods: {
            toDefualtBind(){
                this.$router.push({"path":'/cardManage/bind?type=default'})
            },
            toNewBind(){
                this.$router.push({"path":'/cardManage/bind?type=new'})
            },
            setDefaultBankcard(index){
                // 获取到当前设为默认卡的下标
                var bankcardNo = this.commonCardNo[index];
                var _this = this;
                resource.setDefaultBankcard({
                    bankCardNo:bankcardNo
                },function(result){
                    toast({message:result.msg})
                    if(result.data.success){
                        for(var i=0;i<_this.repayCard.length;i++){
                            _this.repayCard[i].isDefault = 'N'
                        }
                        _this.repayCard[index].isDefault = 'Y'
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .fl{
    float: left
  }
  .fr{
    float: right;
  }
  .card-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 6.9rem;
    height: 2.4rem;
    padding: 0.4rem 0.3rem;
    margin: .3rem auto 0.28rem;
    color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #353e5d;
  }
  .add-card{
    width: 6.9rem;
    height: 2.4rem;
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
  .arrow-right{
    display: inline-block;
    width: 0.11rem;
    height: 0.22rem;
    background: url('../../assets/imgs/bindCardArrow.png') 0 0 no-repeat;
    background-size: .11rem .22rem;
    margin-left: .04rem
  }

  .card-status{
    font-size: 0.2rem;
    text-align: right;
    width: 1.7rem;
    height: .22rem;
  }

</style>
