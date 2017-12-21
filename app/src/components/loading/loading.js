/**
 * Created by Administrator on 2017/5/15.
 */
import Vue from 'vue';

const loading = Vue.extend(require('./loading.vue'));

let instance;

export default {
  open() {
    !instance && (instance = new loading({
      el: document.createElement("div")
    }))
    if(instance.isShow) return;
    document.body.appendChild(instance.$el)

    Vue.nextTick(()=>{
      instance.isShow = true;
    })
  },
  close(){
    instance && (instance.isShow = false);
  }
}
