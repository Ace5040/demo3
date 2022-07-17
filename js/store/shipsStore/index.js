import 'vue';
import 'vuex';
import actions from './modules/actions.js';
import getters from './modules/getters.js';
import mutations from './modules/mutations.js';
import state from './modules/state.js';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state,actions,mutations,getters
// })

var shipsStore = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

export { shipsStore as default };
