<template>
  <nui-cell :is-link="isLink">
    <div slot="left" style="line-height: 1;">
      <label :for="name" class="label" v-text="label"></label>
    </div>
    <slot>
      <div class="nui-field-bankcard" v-if="format==='bansskcard'">
        <div v-show="!disabled">
          <input type="tel" @focus="focusFunc" @keyup="keyupFunc" maxlength="4" v-model="i1" AUTOCOMPLETE="OFF">
          <input type="tel" @focus="focusFunc" @keyup="keyupFunc" maxlength="4" v-model="i2" AUTOCOMPLETE="OFF">
          <input type="tel" @focus="focusFunc" @keyup="keyupFunc" maxlength="4" v-model="i3" AUTOCOMPLETE="OFF">
          <input type="tel" @focus="focusFunc" @keyup="keyupFunc" maxlength="4" v-model="i4" AUTOCOMPLETE="OFF">
          <input type="tel" @focus="focusFunc" @keyup="keyupFunc" maxlength="4" v-model="i5" AUTOCOMPLETE="OFF">
        </div>
        <input type="hidden" :name="name" :value="i1+i2+i3+i4+i5" AUTOCOMPLETE="OFF">
        <div v-show="!i1" class="placeholder" v-text="placeholder"></div>
      </div>
      <input v-if="type=='tel'" :type="type" :name="name" :placeholder="placeholder" :verify="verify" @keyup="keyupFunc" :value="realvalue()" :format="format" :disabled="disabled" AUTOCOMPLETE="OFF">
      <input v-else :type="type" :name="name" :placeholder="placeholder" :verify="verify" @keyup="keyupFunc" :format="format" :disabled="disabled" AUTOCOMPLETE="OFF">
    </slot>
    <div slot="right">
      <slot name="right"></slot>
    </div>
  </nui-cell>
</template>

<script>
  var focusIsChange = false;
    export default {
        name: 'nui-field',
        props:['name','placeholder','isLink','type','label','verify','value','disabled','format'],
        data () {
            return {
              i1:"",
              i2:"",
              i3:"",
              i4:"",
              i5:""
            }
        },
        methods:{
          realvalue(){
            if(this.format=='bankcard'){
              var vv = this.value
              if(/\S{5}/.test(vv)){
                return vv.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
              }
            }else{
              return this.value;
            }
            //  return this.value;
          },
          changeFunc(event){
            if(this.format=='bankcard'){
              var vv = event.currentTarget.value
              if(/\S{5}/.test(vv)){
                event.currentTarget.value = vv.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
              }
            }
          },
          focusFunc(event){
            event.target.value = event.target.value;
            if(!focusIsChange){
              this.toPrevFocus(event.target)
            }else{
              focusIsChange = false;
            }
          },
          toPrevFocus(target){
            if(!target.value){  // 此target无值
              var prev = target.previousElementSibling;
              if(!prev){   // 无前一个兄弟节点  focus当前节点
                return target.focus();
              }
              if(!prev.value){   // 前一个节点无值 再去寻找前一个兄弟几点
                return this.toPrevFocus(prev)
              }
              if(prev.value){    // 前一个节点有值 focus前一个节点
                focusIsChange = true;
                prev.focus()
              }
            }else{
              if(target.value.length==4) {  // 如果此节点的位数为4  则focus下一个节点
                this.toNextFocus(target)
              }
            }
          },
          toNextFocus(target){
            var nextT = target.nextElementSibling;
            if(!nextT||nextT.type!="tel"){
              return target.focus();
            }
            if(nextT.value.length<4){
              nextT.focus()
            }else{
              this.toNextFocus(nextT);
            }
          },
          keyupFunc(event){
            if(this.format=='bankcard'){
              var vv = event.target.value;
              if(/\S{5}/.test(vv)){
                event.target.value = vv.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
              }
            }
          }
//          keyupFunc(event){
//            if(event.keyCode==8){
//              if(event.target.value.length==0&&event.target.previousElementSibling){
//                focusIsChange = true;
//                event.target.previousElementSibling.focus();
//              }
//            }else{
//              if(event.target.value.length==4&&event.target.nextElementSibling&&event.target.nextElementSibling.type=="tel"){
//                focusIsChange = true;
//                event.target.nextElementSibling.focus();
//              }
//            }
//          }
      }
    }
</script>

<style scoped>
  input {
    background-color: inherit;
    font-size: 0.26rem;
    color: #ffffff;
    width: 100%;
  }
  input[disabled],select[disabled]{
    color: rgba(255,255,255,.6);
  }
  .nui-field-bankcard {
    position: relative;
  }
  .nui-field-bankcard input {
    display: inline;
    width: .65rem;
  }
  .placeholder {
    color:rgba(255,255,255,0.6);
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .label {
    width: 2.5rem;
    display: inline-block;
    text-align: left;
    font-size: 0.26rem;
    color:rgba(255,255,255,0.6);
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:rgba(255,255,255,0.6);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:rgba(255,255,255,0.6);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(255,255,255,0.6);
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:rgba(255,255,255,0.6);
  }
</style>
