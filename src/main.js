import Vue from 'vue'
import App from './App.vue'
import store from './store'

// plugins
import VueSimpleSVG from 'vue-simple-svg'

Vue.config.productionTip = false

Vue.use(VueSimpleSVG)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
