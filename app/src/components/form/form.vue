<template>
  <form :action="action" autocomplete="off">
    <slot></slot>
    <nui-button :type="type" :title="title" :is-fill="isFill" :is-mini="isMini" :dealing="dealing" :isDisabled="isDisabled" @click.native="deal" v-if="dealing"></nui-button>
    <nui-button :type="type" :title="title" :is-fill="isFill" :is-mini="isMini" :dealing="dealing" :isDisabled="isDisabled" @click.native="submit" v-else></nui-button>
  </form>
</template>

<script>
  import toast from "../toast/toast"
  import utils from "../../utils/utils"
    export default {
        name: 'nui-form',
        data () {
            return {}
        },
      props:{
        action: String,
        isFill: Boolean,
        isMini: Boolean,
        title: String,
        type: '',
        dealing:Boolean,
        isDisabled:Boolean
      },
      methods:{
        deal(event){
          var elements = this.$el.elements;
          var canVerify = true;
          var jsonForm = {};
          if(canVerify){
            this.$emit("click",jsonForm);
          }
          event.preventDefault();
        },
        submit(event){
          var elements = this.$el.elements;
          var canVerify = true;
          var jsonForm = {};
          for(var i=0; i<elements.length; i++){
            var verify = elements[i].getAttribute("verify");
            var evalue = elements[i].value;
            if(elements[i].getAttribute("format")=="bankcard"){
              evalue = evalue.replace(/\s/g, '')
            }
            if(verify!==null&&verify!==undefined){
              if(utils.isNull(evalue)){
                canVerify = false;
                elements[i].focus()
                toast(elements[i].placeholder)
                break;
              }
              if(verify=="email"){
                if(!utils.isEmail(evalue)){
                  canVerify = false;
                  elements[i].focus();
                  toast("请输入正确的邮箱！")
                }
              }
              if(verify=="mobile"){
                if(!utils.isMobile(evalue)){
                  canVerify = false;
                  elements[i].focus();
                  toast("请输入正确的手机号！")
                  break;
                }
              }
              if(verify=="number"){
                if(!utils.isNum(evalue)){
                  canVerify = false;
                  elements[i].focus();
                  toast("输入有误！")
                  break;
                }
              }
              if(verify=="identity"){
                if(!utils.isIdentity(evalue)){
                  canVerify = false;
                  elements[i].focus();
                  toast("请输入正确的身份证！")
                  break;
                }
              }
            }
            jsonForm[elements[i].name] = evalue;
          }
          if(canVerify){
            this.$emit("click",jsonForm);
          }
          event.preventDefault();
        }
      }
    }
</script>

<style scoped>
</style>
