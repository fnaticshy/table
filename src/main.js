import Vue from 'vue'
import App from './App.vue'
import store from './store'

// plugins
import VueSimpleSVG from 'vue-simple-svg'
import Vuebar from 'vuebar'

Vue.config.productionTip = false

Vue.use(VueSimpleSVG)
Vue.use(Vuebar)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
