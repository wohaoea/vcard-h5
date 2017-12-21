<template>
  <div>
    <div class="info"><span>{{custName}}</span>&nbsp;&nbsp;<span>{{certNo}}</span></div>
    <nui-form type="fill" is-fill title="绑定" @click="formFunc" :dealing="isDeal">
      <nui-field name="bank" label="选择所属银行" type="select" v-if="type == 'default'">
        <div>
            <select name="bank" disabled>
              <option v-bind:value="defaultBankCode">{{bankName}}</option>
            </select>
        </div>
      </nui-field>
      <nui-field name="bank" label="选择所属银行" type="select" is-link v-else>
        <div>
            <select name="bank" class="fr">
              <option v-for="(supportItem,index) in supportBank" v-bind:value="supportItem.dictCode" v-bind:key="index">{{supportItem.dictName}}</option>
            </select>
        </div>
      </nui-field>
      <nui-field name="cardNo" type="tel" label="银行卡卡号" v-model="bankcardNo"  disabled format="bankcard" v-if="type == 'default'"></nui-field>
      <nui-field name="cardNo" type="tel" label="银行卡卡号" v-model="bankcardNo" placeholder="请输入银行卡卡号" format="bankcard" verify="number" v-else></nui-field>
      <nui-field name="mobile" type="tel" label="银行预留手机号" v-model="mobile" placeholder="请输入预留手机" verify="mobile" disabled v-if="type == 'default'"></nui-field>
      <nui-field name="mobile" type="tel" label="银行预留手机号" v-model="mobile" placeholder="请输入预留手机" verify="mobile" v-else></nui-field>
      <nui-field name="code" label="手机验证码" v-model="smsCode" placeholder="请输入手机验证码" verify="number">
          <div slot="right">
              <nui-button is-code type="solid" is-mini title="获取验证码" :number="number" unit="s" @data="getData" @click.native="getCode"></nui-button>
          </div>
      </nui-field>

    </nui-form>
  </div>
</template>

<script>
  import toast from "../../components/toast/toast"
  import utils from "../../utils/utils"
    export default {
      name: 'bank',
      data () {
          return {
            number:0,
            formdata:{},
            type: 'default',
            defaultCard: null,
            bankName: '',
            bankcardNo: '',
            mobile: '',
            smsCode: '',
            batchNo: '',
            isDeal: false,
            custName: '',
            certNo: '',
            supportBank: null,
            defaultBankCode:'',
            flag: true,
            trueCardNo: ''
          }
      },
      created(){
          var _this = this;
          this.type = this.$route.query.type;
          // 获取用户身份信息
          resource.realInfo({},function(result){
              _this.custName = result.data.custName;
              _this.certNo = utils.encryption(result.data.certNo);
          })
          // 获取所支持的银行
          resource.getSupportBankInfos({},function(result){
              if(result.code == '000000'){
                  _this.supportBank = result.data
              }else{
                  toast({message:result.msg});
              }
          })
          if(this.type == 'default'){
              resource.getAuthBankInfo({},function(result){
                  if(!utils.isEmptyObject(result.data)){
                      _this.defaultCard = result.data;
                      _this.bankName =  result.data.bankName;
                      _this.trueCardNo = result.data.bankcardNo;
                      _this.bankcardNo = utils.encryption(result.data.bankcardNo);
                      _this.mobile = result.data.mobile
                      _this.defaultBankCode = result.data.bankCode;
                  }else{
                      toast({
                          message: "服务器出了一点小故障",
                          position:'',
                          iconClass:'warning',
                          duration:'2000'
                      })
                  }
              });
          }
      },
      computed: {

      },
      methods:{
        getCode(){
          var _this = this;
          var data = _this.formData
          var cardNo = _this.type == 'default' ? _this.trueCardNo : data.cardNo;
          if(!utils.isMobile(data.mobile)){
            toast("请填写正确的手机号")
            return;
          }  
          if(_this.flag){
            _this.flag = false;
            
            resource.sendAgentSms({
              bankCardNo: cardNo,
              mobile: data.mobile,
              transType: "ACP_AUTH"
            },function(result){
              if(result.code == '000000'){
                if(result.data.success){
                  toast({"message":result.msg})
                  _this.batchNo = result.data.data.batchNo;
                  _this.number = "60-"+Date.now();
                  setTimeout(function() {
                    _this.flag = true;
                  }, 60000);
                }else{
                  toast({"message":result.msg})
                  setTimeout(function() {
                    _this.flag = true;
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
            var _this = this;
            _this.isDeal = true;
            for(var i=0;i<_this.supportBank.length;i++){
                if(_this.supportBank[i].dictCode == data.bank){
                    data.bankName = _this.supportBank[i].dictName
                }
            }
            var cardNo = _this.type == 'default' ? _this.trueCardNo : data.cardNo;
            resource.repayBankCardActive({
                bankCardNo : cardNo,
                mobile: data.mobile,
                batchNo: _this.batchNo,
                smsCode: data.code,
                bankName: data.bankName,
                bankCode: data.bank
            },function(result){
                if(result.code == '000000'){
                  _this.isDeal = false;
                  _this.$router.push({"path":'/cardManage/bindResult?bindResult='+result.data.success+'&type='+_this.type})
                }else{
                  toast({message:result.msg})
                }
            })
        }
      },
      beforeRouteLeave(to, from, next){
        this.times&&clearInterval(this.times);
        next();
      }

    }
</script>

<style scoped>
  .fr{
    float: right;
  }
  .info {
    font-size: 0.24rem;
    padding: 0.24rem 0.25rem;
    text-align: left;
    color: rgba(255,255,255,0.4);
  }
  .form {
    background-color: rgba(0,0,0,0.2);
    padding: 0.2rem 0 0.6rem 0;
  }
  select {
    border: none;
    color:#ffffff;
    background: transparent;
    -webkit-appearance: none; /*for chrome*/
    padding-right: 0.3rem;
    font-size: 0.28rem;
  }
</style>
