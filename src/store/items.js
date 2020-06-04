import { getProducts } from '../mock/request'

export default {
  state: {
    items: [],
  },
  mutations: {
    deleteProducts({ items }, payload) {
      console.log(items)
      console.log('payload', payload)
    },
    saveProducts(state, payload) {
      state.items = payload
    },
    updateProducts(state, { start, end, currentValue }) {
      for (let counter = start; counter < end; counter++) {
        state.items[counter].chosen = !currentValue
      }
    },
    updateProduct(state, { start, end, item }) {
      for (let counter = start; counter <= end; counter++) {
        if (state.items[counter].id === item.id) {
          state.items[counter].chosen = !state.items[counter].chosen
        }
      }
    },
  },
  actions: {
    deleteProducts({ commit }, payload) {
      commit('deleteProducts', payload)
    },
    async getProducts({ commit }) {
      try {
        const products = await getProducts()
        products.forEach((el) => {
          el.chosen = false
        })
        commit('saveProducts', products)
      } catch (e) {
        console.log(e)
      }
    },
    updateProducts({ commit }, payload) {
      commit('updateProducts', payload)
    },
    updateProduct({ commit }, payload) {
      commit('updateProduct', payload)
    },
  },
  getters: {
    getItems({ items }) {
      return items
    },
  },
}
