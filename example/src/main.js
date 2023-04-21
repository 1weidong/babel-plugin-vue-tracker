import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.save = (...param) => {
  console.log(...param)
}
new Vue({
  render: h => h(App),
}).$mount('#app')
