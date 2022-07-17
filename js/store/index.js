import Vue from 'vue';
import Vuex from 'vuex';
import dispStore from './dispStore/index.js';
import shipsStore from './shipsStore/index.js';

// export default {dispStore,shipsStore}
Vue.use(Vuex);

var localStore = new Vuex.Store({
  modules: {
    dispStore,
    shipsStore
  },
});

export { localStore as default };
