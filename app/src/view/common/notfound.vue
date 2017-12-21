<template>
  <div>
    <nui-header></nui-header>
    <img src="../../assets/imgs/404.png">
    <nui-button type="empty" title="返回" @click.native="back"></nui-button>
  </div>
</template>

<script>
    export default {
      name: 'notfound',
      data () {
          return {}
      },
      methods:{
        back: function(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  img {
    width: 100%;
    margin-bottom: .3rem;
  }
</style>
