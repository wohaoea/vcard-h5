/**
 * Created by Administrator on 2017/5/9.
 */
import Vue from 'vue';

const ToastConstructor = Vue.extend(require('./toast.vue'));

let removeDom = event => {
  if (event.target.parentNode) {
    // event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function() {
  this.visible = false;
  // this.$el.addEventListener('transitionend', removeDom);
};

let Toast = (options = {}) => {
  let duration = options.duration || 2500;
  while(Vue.eventList&&Vue.eventList.length>0){
    let tempInstance = Vue.eventList.pop();
    if(tempInstance.$el.parentNode){
      tempInstance.$el.parentNode.removeChild(tempInstance.$el);
      clearTimeout(tempInstance.timer);
    }
  }
  var instance = new ToastConstructor().$mount(document.createElement('div'));
  Vue.eventList? Vue.eventList.push(instance):Vue.eventList = [instance]
  instance.closed = false;

  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  instance.iconClass = options.iconClass?('nui-toast-' + options.iconClass) : '';
  instance.visible = true;

  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    // instance.$el.removeEventListener('transitionend', removeDom);
    ~duration && (instance.timer = setTimeout(function() {
      if (instance.closed) return;
      instance.close();
    }, duration));
  });

  
  return instance;
};

export default Toast;
