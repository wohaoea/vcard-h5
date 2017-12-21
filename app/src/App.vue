<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import toast from './components/toast/toast.js'
  import loading from './components/loading/loading.js'
  export default {
    name: 'app'
  }
</script>

<style>
  body{
    background-color: #3a4467;
  }

</style>
