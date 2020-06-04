import Vue from 'vue'
import Vuex from 'vuex'

import filter from './filter'
import items from './items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    filter,
    items,
  },
})
