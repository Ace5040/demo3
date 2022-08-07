import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import { createAction } from "@reduxjs/toolkit";
import "devextreme/dist/css/dx.light.css";
import localStore from "./store"
import VueI18n from "vue-i18n";
import { locale as setDevextremeLocale } from "devextreme/localization";
import moment from "moment";
const appInfo = require("../package.json");

import App from "./App.vue";

let storeSubscribe = null;

Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.prototype.store = localStore
Vue.prototype.$bus = new Vue();

let i18n = new VueI18n({
  locale: "ru",
  messages: {}
});

setDevextremeLocale("ru");
moment.locale("ru");

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      Vue.prototype.$redux = this.store;
      Vue.prototype.$redux.createAction = createAction;
      // The code below gets a fresh dictionary on startup and unsubscribes
      this.store.storeRedux.dispatch(this.store.functions.translateDictEpcs.getDict())
      storeSubscribe = this.store.storeRedux.subscribe(() => {
        let localeStore = this.store.storeRedux.getState().translateDict.dictionaries;
        if (localeStore[appInfo.name]) {
          Object.keys(localeStore[appInfo.name]).forEach(dictLocale => {
            i18n.setLocaleMessage(dictLocale, localeStore[appInfo.name][dictLocale]);
          })
          storeSubscribe();
        }
      })
      return h(App, {
        props: {
          eventBus: this.eventBus,
          store: localStore
        }
      });
    },
    i18n
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
export class Permit {
  constructor(element, options) {
    // Vue.prototype.store.dispatch('dispStore/setGmiloUrl', options.gmilourl);
    new Vue({
      render: h => h(App,{
        props: {
          eventBus: Vue.prototype.$bus,
          store: localStore
        }
      }),
    }).$mount(element);
  }
}
