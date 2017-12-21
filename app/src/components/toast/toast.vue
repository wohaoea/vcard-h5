<template>
  <transition name='fade'>
    <div v-show='visible' :class="[position, {longMsg:message&&message.length>15}, {noicon:!iconClass}]" class='nui-toast'>
      <i class="nui-toast-icon" :class="iconClass" v-if="iconClass!==''"></i>
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name:'nui-toast',
    data(){
      return {
        visible:false
      }
    },
    props:['message','position','iconClass']
  }
</script>

<style scoped>
  .nui-toast {
    position: fixed;
    left:50%;
    transform:translate(-50%,-50%) scale(1);
    word-wrap:break-word;
    padding:0.25rem;
    text-align: center;
    z-index:9999;
    font-size:.3rem;
    width:48%;
    color: #fff;
    border-radius: 0.2rem;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
  }
  .nui-toast{
    top:50%;
  }
  .nui-toast .nui-toast-icon {
    width: 0.4rem;
    height: 0.4rem;
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0.3rem auto 0.15rem;
  }
  .longMsg .nui-toast-icon{
    margin-top:0;
  }
  .nui-toast .nui-toast-yes {
    background-image: url('./icon/yes.png');
  }
  .nui-toast .nui-toast-no {
    background-image: url('./icon/no.png');
  }
  .nui-toast .nui-toast-warning {
    background-image: url('./icon/warning.png');
  }
  .nui-toast p {
    margin-bottom: 0.3rem;
  }
  .noicon p, .longMsg p {
    margin-bottom:0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .3s;
  }
  .fade-enter, .fade-leave-active {
    transform:translate(-50%,-50%) scale(0);
  }
</style>
