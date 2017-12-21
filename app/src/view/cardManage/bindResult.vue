<template>
  <div class="marginTop30">
    <nui-step :index=step :values="['选择新<br>银行卡','提交<br>更改','绑卡<br>成功']"></nui-step>
    <div class="result" v-if="bindResult">
      <img src="../../assets/imgs/successChange.png" alt="">
      <p>绑卡成功</p>
    </div>
    <div class="result" v-else>
      <img src="../../assets/imgs/changefail.png" alt="">
      <p>绑卡失败</p>
    </div>
    <div class="button" @click="jump" v-text="btnText"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bindResult:false
      }
    },
    created(){
      if(this.$route.query.bindResult == 'true'){
        this.bindResult = true;
      }else{
        this.bindResult = false;
      }
      this.type = this.$route.query.type;
    },
    computed:{
      step(){
        return this.bindResult ? '5' : '2';
      },
      btnText(){
        return this.bindResult ? '确定' : '重新绑定' ;
      }
    },
    methods: {
      jump(){
        let url = this.bindResult ? 'list' : '/cardManage/bind?type='+this.type;
        window.location.href = url;
      }
    }
  }
</script>

<style scoped>
  .marginTop30{
    margin-top: .3rem
  }
  .result img{
    width: 2.4rem;
    height: 2.4rem;
    margin-top: 1.4rem;
  }
  .result p{
    margin-top: 0.6rem;
    font-size: 0.32rem;
    color: #989aa9;
  }
  .button{
    width: 6.8rem;
    height: 1rem;
    margin: 1rem auto 0;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #fff;
    border-radius:4px ;
    background: url('../../assets/imgs/purple-bg.png');
    background-size:100%;
  }
</style>
