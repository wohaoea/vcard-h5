<template>
  <transition name="opacity">
    <div class="loading" v-show="isShow">
      <img src="./icon/loading.gif">
    </div>
  </transition>
</template>

<script>
    export default {
      name: 'nui-loading',
      props:["isShow"],
      data () {
          return {}
      }
    }
</script>

<style scoped>
  .loading {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 999;
  }
  .loading img {
    position: absolute;
    top:50%;
    left: 50%;
    width: 0.64rem;
    margin-top: -0.32rem;
    margin-left: -0.32rem;
  }
  .opacity-enter-active, .opacity-leave-active {
    transition: opacity .3s linear;
  }
  .opacity-enter, .opacity-leave {
    opacity: 0;
  }
</style>
