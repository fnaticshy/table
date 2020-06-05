import { getProducts } from '../mock/request'
import { deleteProducts } from '../mock/request'

export default {
  state: {
    items: [],
  },
  mutations: {
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
    async deleteProducts({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await deleteProducts(payload)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e)
        commit('setLoading', false)
        throw e
      }
    },
    async getProducts({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const products = await getProducts()
        products.forEach((el) => {
          el.chosen = false
        })
        commit('saveProducts', products)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e)
        commit('setLoading', false)
        throw e
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
