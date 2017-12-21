<template>
  <button @click="clickFunc"
          :class="[btnClass, {'nui-button-fixed':isFill}, {'nui-button-mini':isMini}, {'nui-button-disabled':isLoan}]"
          v-text="innumber?(innumber+unit):dealing?'处理中':title"
          :disabled="!!innumber"
           :style="style" :dealing="dealing" :isDisabled="isDisabled"></button>
</template>

<script>
    export default {
      name: 'nui-button',
      created(){
        if(this.isFill){
          this.style.height = document.body.clientWidth/7.5*0.92 + "px";
        }
      },
      data(){
        return {
          style:{},
          times:null,
          innumber:0
        }
      },
      props:{
        isFill: Boolean,
        isMini: Boolean,
        title: String,
        type: '',
        number:0,
        unit:String,   // 计数单位
        isLoan: Boolean,
        dealing:Boolean,
        isCode:Boolean,
        isDisabled:Boolean
      },
      watch:{
        number:function (newValue) {
            if(this.isCode){
              this.innumber = newValue.split("-")[0]-0;
              !this.times && (this.times=setInterval(()=>{
                this.innumber--
                if(this.innumber<=0){
                  clearInterval(this.times);
                  this.times = null;
                }
              },1000))
            }
        }
      },
      methods:{
        clickFunc(){
          if(this.$el.form){
            var elements = this.$el.form.elements;
            var json =  [].reduce.call(elements, function(pv,v){
              pv[v.name] = v.value;
              if(v.getAttribute("format")=="bankcard"){
                pv[v.name] = pv[v.name].replace(/\s/g, '');
              }
              return pv;
            },{})
            delete json[""]
            this.$emit("data", json)
          }
          event.preventDefault();
        }
      },
      computed:{
        btnClass(){
          if(this.dealing || this.isDisabled){
            return 'nui-button-dealing';
          }
          if(!this.isMini){
            return 'nui-button-'+this.type;
          }else{
            return 'nui-button-mini-'+this.type;
          }
        }
      }
    }
</script>

<style scoped>
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 0;
    width: 6.8rem;
    height: 1rem;
    line-height: 1;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    color: #fefefe;
    font-size: 0.36rem;
    background-color: transparent;
  }
  button[disabled]{
    background-color: #989aa9;
    border-radius: .08rem;
    background-image: none;
  }
  .nui-button-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }
  .nui-button-dealing {
    background-image: none;
    background-color: rgba(255,255,255,0.1);
    z-index: 99;
  }

  .nui-button-mini {
    text-align: center;
  }
  .nui-button-mini-empty {
    width: 1.58rem;
    height: .58rem;
    font-size: .28rem;
    border-radius: .08rem;
    border: .02rem solid #ffffff;
    color: #ffffff;
  }
  .nui-button-mini-solid {
    width: 1.48rem;
    height: .52rem;
    font-size: .24rem;
    background-image: url("./icon/btn-mini-solid.png");
  }
  .nui-button-empty {
    background-image: url("./icon/btn-empty.png");
  }
  .nui-button-solid {
    background-image: url("./icon/btn-solid.png");
  }
  .nui-button-fill {
    background-image: url("./icon/btn-fill.png");
  }
  .nui-button-disabled{
    background-color: #353e5d;
    color: #6f7486;
    background-image: none;
  }
</style>
