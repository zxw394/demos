import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/app.less'


Vue.use(ElementUI);
Vue.config.productionTip = false;

Array.prototype.clearArray = function() {
  this.splice(0, this.length);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
