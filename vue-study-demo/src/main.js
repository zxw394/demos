import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局引入ant design
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.config.productionTip = false

Array.prototype.clearArray = function() {
  this.splice(0, this.length);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
