import Vue from 'vue';
import App from './src/App.vue';
// import App from './App.vue.js';
// import localStore from './js/store/index.js';
// import VueI18n from 'vue-i18n';
// import './js/store/dispStore';

// Vue.config.productionTip = false;

// Vue.use(VueI18n);
// Vue.prototype.store = localStore;
Vue.prototype.$bus = new Vue();

class init {
  constructor(element, options) {
    // Vue.prototype.store.dispatch('dispStore/setGmiloUrl', options.gmilourl);
    new Vue({
      render: h => h(App),
    }).$mount(element);
  }
}

export { init };
