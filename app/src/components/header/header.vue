<template>
  <header class="nui-flex nui-header" :class="{ 'nui-header-fixed': fixed }">
    <div class="nui-flex1 nui-header-button nui-header-left">
      <slot name="left">
        <i @click="back" v-if="!noback"></i>
      </slot>
    </div>
    <h1 class="nui-flex2 nui-header-title" v-text="title"></h1>
    <div class="nui-flex1 nui-header-button nui-header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
    export default {
      name: 'nui-header',
      props: {
        fixed: Boolean,
        title: String,
        noback: Boolean
      },
      methods:{
        back: function(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style>
  .nui-header {
    background-color: #3B4568;
    color: #fff;
    font-size: 0.32rem;
    padding: .35rem .2rem;
    line-height: 1;
  }
  .nui-header-fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9999;
  }
  .nui-header-button {

  }
  .nui-header-title {
    /*overflow: hidden;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
  }
  .nui-header-left {
    text-align: left;
  }
  .nui-header-left i {
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
    background: url("./icon/back.png") no-repeat;
    background-size: cover;
  }
  .nui-header-right {
    text-align: right;
  }
</style>
