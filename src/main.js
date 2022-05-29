import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://43.138.55.69/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
