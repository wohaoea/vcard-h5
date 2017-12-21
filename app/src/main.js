// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import reset from '../static/css/reset.css'
import nui from '../static/css/nui.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from './controller/resource'
import utils from './utils/baseView'


window.resource = resource;
Vue.config.debug = true;//开启错误提示

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

router.onReady(route => {
  if(route){
    utils.init(route.meta.title || document.title)
  }
});

router.beforeEach((to, from, next) => {
  utils.init(to.meta.title || document.title)
  next();
});
router.afterEach((to, from) => {
  while(Vue.eventList&&Vue.eventList.length>0){
    let tempInstance = Vue.eventList.pop();
    tempInstance.$el.parentNode.removeChild(tempInstance.$el);
    clearTimeout(tempInstance.timer);
  }
});
