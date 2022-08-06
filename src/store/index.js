import Vue from "vue";
import Vuex from "vuex";
import applicationFloatStore from "./applicationFloatStore";
import dictionariesStore from "./dictionariesStore";
import applicationFloatListStore from "./applicationFloatListStore";
import permitListStore from "./permitListStore";
import refusalListStore from "./refusalListStore";
import notificationsStore from "./notificationsStore";
import shipsListStore from "./shipsListStore";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    applicationFloatStore,
    dictionariesStore,
    applicationFloatListStore,
    permitListStore,
    refusalListStore,
    notificationsStore,
    shipsListStore,
  },
});
