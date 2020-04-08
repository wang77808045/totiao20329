import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './styles/index.less'
// import JSONbig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios.defaults.transformResponse = [function (data) {
//   try {
//     return JSONbig.parse(data)
//   } catch (err) {
//     return data
//   }
// }]

Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(element)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
