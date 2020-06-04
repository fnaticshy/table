<template lang="pug">
  div
    TableFilter(
      :filterOptions="filterOptions"
      :filteredOptions="filteredOptions"
      :countOfConclusions="countOfConclusions"
      :checkedItems="checkedItems"
      :pageCount="pageCount"
      @onPrevPage="nextPage"
      @onNextPage="prevPage"
      )
    TableHeadings(
      :headings="filteredOptions"
      :areAllItemsSelected="areAllItemsSelected"
      @onSelectAll="selectAllHandler"
      @onSortColumnByField="sortColumnByField"
      )
    div
      TableItem(
        v-for="item of filteredItems"
        :key="item.id"
        :checked="item.chosen"
        :item="item"
        @onOpenModal="modalHandler"
        @onAddToDeletion="addToDeletion"
        )
    ModalTooltip(
      ref="ModalTooltip"
      :style="modalCoords"
      v-show="modal.isVisible"
      @onAction="closeModal"
      )
</template>

<script>
import TableItem from './TableItem'
import TableHeadings from './TableHeadings'
import ModalTooltip from '../ModalTooltip'
import TableFilter from './TableFilter'

export default {
  name: 'Table',
  components: {
    TableItem,
    TableHeadings,
    ModalTooltip,
    TableFilter,
  },
  data() {
    return {
      modal: {
        isVisible: false,
        coords: {
          top: 0,
          left: 0,
        },
      },
      checkedItems: [],
      pagination: {
        pageNumber: 0,
        start: null,
        end: null,
      },
    }
  },
  computed: {
    sortedByCategory() {
      return this.$store.getters.sortedByCategory
    },
    areAllItemsSelected() {
      let result = true

      if (this.paginatedData.length !== 0) {
        this.paginatedData.forEach((el) =>
          result ? (result = el.chosen) : result
        )
      } else {
        result = false
      }

      return result
    },
    filteredItems() {
      const items = []

      this.paginatedData.forEach((el) => {
        const item = {}

        for (let [key, value] of Object.entries(el)) {
          if (
            this.filterOptionsList.includes(key) ||
            key === 'id' ||
            key === 'chosen'
          ) {
            item[key] = value
          }
        }

        if (Object.keys(item).length !== 0) {
          items.push(item)
        }
      })
      console.log(this.sortedByCategory, this.sortColumnBy)
      return items.sort((a, b) => {
        if (a[this.sortColumnBy] > b[this.sortColumnBy]) {
          return 1
        }
        if (a[this.sortColumnBy] < b[this.sortColumnBy]) {
          return -1
        }
        return 0
      })
    },
    chosenCountOfConclusions() {
      return this.$store.getters.chosenCountOfConclusions
    },
    sortColumnBy() {
      return this.$store.getters.sortColumnBy
    },
    filteredOptions() {
      return this.$store.getters.filteredOptions
    },
    filterOptionsList() {
      return this.$store.getters.filterOptionsList
    },
    getItems() {
      return this.$store.getters.getItems
    },
    modalCoords() {
      return `top:${this.modal.coords.top}px;right:${this.modal.coords.left}px;`
    },
    filterOptions() {
      return this.$store.getters.filterOptions
    },
    countOfConclusions() {
      return this.$store.getters.countOfConclusions
    },
    pageCount() {
      let l = this.getItems.length,
        s = this.chosenCountOfConclusions

      return {
        pageCount: Math.ceil(l / s),
        page: this.pagination.pageNumber,
        count: this.getItems.length,
        start: this.pagination.pageNumber * this.chosenCountOfConclusions,
        end:
          this.pagination.pageNumber * this.chosenCountOfConclusions +
          this.chosenCountOfConclusions,
      }
    },
    paginatedData() {
      const start = this.pagination.pageNumber * this.chosenCountOfConclusions,
        end = start + this.chosenCountOfConclusions

      return this.getItems.slice(start, end)
    },
  },
  methods: {
    nextPage() {
      this.pagination.pageNumber++
    },
    prevPage() {
      this.pagination.pageNumber--
    },
    closeModal() {
      this.modal.isVisible = false
    },
    sortColumnByField(id) {
      // todo добавить возможность переключать сортировку только в активном по сортировке поле
      this.$store.dispatch('updateColumnSorting', id)
    },
    selectAllHandler() {
      this.$store.dispatch('updateProducts', {
        currentValue: this.areAllItemsSelected,
        start: this.pagination.pageNumber * this.chosenCountOfConclusions,
        end:
          this.pagination.pageNumber * this.chosenCountOfConclusions +
          this.chosenCountOfConclusions,
      })
      this.paginatedData.forEach((item) => {
        if (item.chosen) {
          this.checkedItems.push(item.id)
          // uniq
          this.checkedItems = this.checkedItems.filter(function (
            value,
            index,
            self
          ) {
            return self.indexOf(value) === index
          })
        } else {
          this.checkedItems = this.checkedItems.filter((el) => el !== item.id)
        }
      })
    },
    addToDeletion(item) {
      if (this.checkedItems.includes(item.id)) {
        this.checkedItems = this.checkedItems.filter((el) => el !== item.id)
      } else {
        this.checkedItems.push(item.id)
      }
      this.$store.dispatch('updateProduct', {
        item,
        start: this.pagination.pageNumber * this.chosenCountOfConclusions,
        end:
          this.pagination.pageNumber * this.chosenCountOfConclusions +
          this.chosenCountOfConclusions,
      })
    },
    modalHandler(ctx) {
      const coords = ctx.target.getBoundingClientRect(),
        minHeightFromModel = 96,
        minWidthFromModel = 254,
        spacer = 5,
        currentHeight = this.$refs.ModalTooltip.$el.offsetHeight,
        currentWidth = this.$refs.ModalTooltip.$el.offsetWidth,
        modalHeight = currentHeight !== 0 ? currentHeight : minHeightFromModel,
        modalWidth = currentWidth !== 0 ? currentWidth : minWidthFromModel

      let top = coords.top - modalHeight - spacer
      if (top < 0) top = coords.top + coords.height + spacer

      let right = coords.right + (ctx.target.offsetWidth - modalWidth) / 2
      if (right < 0) right = 0

      this.modal.coords = {
        top,
        right,
      }
      this.modal.isVisible = true
    },
  },
  created() {
    this.$store.dispatch('getProducts')
  },
}
</script>
