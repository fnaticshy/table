export default {
  state: {
    filterOptions: [
      {
        name: 'Product (100g serving)',
        value: 'product',
        isActive: true,
        sortedBy: true,
        sortByColumn: false,
        id: 1,
      },
      {
        name: 'Calories',
        value: 'calories',
        isActive: true,
        sortedBy: false,
        sortByColumn: false,
        id: 2,
      },
      {
        name: 'Fat (g)',
        value: 'fat',
        isActive: true,
        sortedBy: false,
        sortByColumn: false,
        id: 3,
      },
      {
        name: 'Carbs (g)',
        value: 'carbs',
        isActive: true,
        sortedBy: false,
        sortByColumn: false,
        id: 4,
      },
      {
        name: 'Protein (g)',
        value: 'protein',
        isActive: true,
        sortedBy: false,
        sortByColumn: false,
        id: 5,
      },
      {
        name: 'Iron (%)',
        value: 'iron',
        isActive: true,
        sortedBy: false,
        sortByColumn: false,
        id: 6,
      },
    ],
    countOfConclusions: [
      {
        name: '10 per page',
        value: 10,
        isActive: true,
        id: 1,
      },
      {
        name: '15 per page',
        value: 15,
        isActive: false,
        id: 2,
      },
      {
        name: '20 per page',
        value: 20,
        isActive: false,
        id: 3,
      },
    ],
    isEverythingSelected: true,
  },
  mutations: {
    updateFilter(state, payload) {
      const clonedArr = [...state.filterOptions]
      clonedArr.forEach((el) => {
        if (el.id === payload.id) {
          el.isActive = !el.isActive
          if (el.sortedBy) {
            const arr = [...state.filterOptions].filter(
              (el) => el.isActive === true
            )
            state.filterOptions.forEach((el) => (el.sortedBy = false))

            for (let item of arr) {
              if (item.isActive && !payload.isActive) item.sortedBy = true
              break
            }
          }
          state.isEverythingSelected = false
        }
      })
      state.filterOptions = clonedArr
    },
    updatePagination(state, payload) {
      const clonedArr = [...state.countOfConclusions]
      clonedArr.forEach((el) => {
        el.isActive = el.id === payload.id
      })
      state.countOfConclusions = clonedArr
    },
    updateAll(state, payload) {
      const clonedArr = [...state.filterOptions]
      clonedArr.forEach((el) => {
        el.isActive = payload
      })
      state.filterOptions = clonedArr
    },
    updateSortedBy(state, payload) {
      const clonedArr = [...state.filterOptions]
      clonedArr.forEach((el) => {
        if (el.id === payload) {
          el.sortedBy = true
        } else {
          el.sortedBy = false
        }
      })
      state.filterOptions = clonedArr
    },
    isEverythingSelected(state) {
      state.isEverythingSelected = !state.isEverythingSelected
    },
    updateColumnSorting(state, payload) {
      const clonedArr = [...state.filterOptions]
      clonedArr.forEach((el) => {
        if (!payload.isCorrectElement) return
        el.sortByColumn = el.id === payload.id
      })
      state.filterOptions = clonedArr
    },
    resetSortingBy(state) {
      const clonedArr = [...state.filterOptions]
      clonedArr.forEach((el) => (el.sortByColumn = false))
      state.filterOptions = clonedArr
    },
  },
  actions: {
    updateFilters({ commit }, { el, type }) {
      if (type === 'filter') commit('updateFilter', el)
      if (type === 'pagination') commit('updatePagination', el)
    },
    updateAll({ commit }, payload) {
      commit('updateAll', payload)
    },
    updateSortedBy({ commit }, payload) {
      commit('updateSortedBy', payload)
    },
    isEverythingSelected({ commit }) {
      commit('isEverythingSelected')
    },
    updateColumnSorting({ commit }, payload) {
      commit('updateColumnSorting', payload)
    },
    resetSortingBy({ commit }) {
      commit('resetSortingBy')
    },
  },
  getters: {
    filterOptions({ filterOptions }) {
      return filterOptions
    },
    filterOptionsList({ filterOptions }) {
      const arr = []
      filterOptions.forEach((el) => {
        if (el.isActive === true) arr.push(el.value)
      })
      return arr
    },
    chosenCountOfConclusions({ countOfConclusions }) {
      let val
      countOfConclusions.forEach((el) => {
        if (el.isActive) val = el.value
      })
      return val
    },
    filteredOptions({ filterOptions }) {
      return filterOptions.filter((el) => el.isActive === true)
    },
    countOfConclusions({ countOfConclusions }) {
      return countOfConclusions
    },
    isEverythingSelected({ isEverythingSelected }) {
      return isEverythingSelected
    },
    sortedByCategoryId({ filterOptions }) {
      let val
      filterOptions.forEach((el) => {
        if (el.sortedBy) {
          val = el.id
        }
      })
      return val
    },
    sortedByCategoryVal({ filterOptions }) {
      let val
      filterOptions.forEach((el) => {
        if (el.sortedBy) {
          val = el.value
        }
      })
      return val
    },
    sortColumnBy({ filterOptions }) {
      let val = null
      filterOptions.forEach((el) => {
        if (el.sortByColumn) {
          val = el.value
        }
      })
      return val
    },
  },
}
