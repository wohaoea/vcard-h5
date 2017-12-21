<template>
  <div class="nui-step">
    <div class="nui-step-circle" :class="{'nui-step-circle-now':index>=1}" v-html="values[0]"></div>
    <div class="nui-step-dashed" :class="{'nui-step-circle-now':index>=2}"></div>
    <div class="nui-step-circle" :class="{'nui-step-circle-now':index>=2}" v-html="values[1]"></div>
    <div class="nui-step-dashed" :class="{'nui-step-circle-now':index>=3}"></div>
    <div class="nui-step-circle" :class="{'nui-step-circle-now':index>=4}" v-html="values[2]"></div>
  </div>
</template>

<script>
    export default {
        name: 'nui-step',
        props:{
          index:String,
          values:Array
        }
    }
</script>

<style scoped>
  .nui-step {
    margin: 0 auto;
  }
  .nui-step > div {
    display: inline-block;
  }
  .nui-step-circle{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1rem;
    color: #ffffff;
    background-color: #989aa9;
    font-size: 0.24rem;
    padding: 0.24rem 0.1rem;
  }
  .nui-step-dashed {
    width: 1.25rem;
    border-top: 1px dashed #ffffff;
    margin: 0 0.05rem;
    position: relative;
    top:-0.25rem;
  }
  .nui-step-circle.nui-step-circle-now {
    background-color: #e35386;
  }
  .nui-step-dashed.nui-step-circle-now {
    border-color: #e35386;

  }
</style>
