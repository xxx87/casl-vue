import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import { abilitiesPlugin } from "@casl/vue";
import { confirmPlugin } from "./plugins/confirm";
import App from "./App";
import router from "./router";
import http from "./services/http";
import { store } from "./store";

Vue.config.productionTip = false;
Vue.use(confirmPlugin);
Vue.use(abilitiesPlugin, store.getters.ability);

http.token = store.state.token;
http.onError = (response) => {
  if (response.status === 403) {
    store.dispatch("forbidden", response);
    return true;
  }

  if (response.status === 401) {
    store.dispatch("sessionExpired", response);
    return true;
  }
};

new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: (h) => h(App)
});
