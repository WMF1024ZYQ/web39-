import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import bus from "vue-bus";
Vue.use(bus);
Vue.config.productionTip = false;

import "./assets/base.css";
import "./assets/index.css";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
