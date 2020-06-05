<template lang="pug">
  .table
    template(v-if="loading")
      BaseLoader.table__loader
    template(v-else)
      TableFilter(
        :filterOptions="filterOptions"
        :filteredOptions="filteredOptions"
        :countOfConclusions="countOfConclusions"
        :checkedItems="checkedItems"
        :pageCount="pageCount"
        @onSortingBy="sortingByHandler"
        @onOpenModal="modalHandler"
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
          v-for="item of sortedItems"
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
        @onAction="deleteItems"
        @onCancel="modal.isVisible = false"
        )
      BaseModal(
        v-if="error"
        @onClose="tryGetItems"
        )
        h3(slot="header") {{ error.error }}
        h3(slot="body") To reconnect, click reconnect.
</template>

<script>
import TableItem from './TableItem'
import TableHeadings from './TableHeadings'
import ModalTooltip from '../ModalTooltip'
import TableFilter from './TableFilter'
import BaseLoader from "../BaseLoader"
import BaseModal from "../BaseModal";

export default {
  name: 'Table',
  components: {
    TableItem,
    TableHeadings,
    ModalTooltip,
    TableFilter,
    BaseLoader,
    BaseModal
  },
  data() {
    return {
      modal: {
        isVisible: false,
        coords: {
          top: 0,
          right: 0,
        },
      },
      checkedItems: [],
      pagination: {
        pageNumber: 0,
        start: null,
        end: null,
      },
      operationData: null,
    }
  },
  methods: {
        nextPage() {
            this.pagination.pageNumber++
        },
        prevPage() {
            this.pagination.pageNumber--
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
        sortColumnByField(id) {
            const isCorrectElement = this.sortedByCategory.id === id
            this.$store.dispatch('updateColumnSorting', { id, isCorrectElement })
        },
        sortingByHandler(id) {
            this.$store.dispatch('updateSortedBy', id)
            this.$store.dispatch('resetSortingBy')
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
            if (right > document.documentElement.clientWidth - modalWidth)
                right = document.documentElement.clientWidth - modalWidth
            if (right < 0) right = 0

            this.modal.coords = {
                top,
                right,
            }

            this.operationData = {
                type: ctx.currentTarget.dataset.type,
                id: ctx.currentTarget.dataset.id,
            }

            this.modal.isVisible = true
        },
        deleteItems() {
            if (this.operationData.type === 'heap') {
                this.$store.dispatch('deleteProducts', this.checkedItems)
            } else {
                this.$store.dispatch('deleteProducts', [+this.operationData.id])
            }
            this.modal.isVisible = false
        },
        tryGetItems() {
            this.$store.dispatch('getProducts')
        }
    },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
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

      return items
    },
    sortedItems() {
      return [...this.filteredItems].sort((a, b) => {
        if (this.sortColumnBy === 'product') {
          if (a[this.sortColumnBy] > b[this.sortColumnBy]) {
            return 1
          }
          if (a[this.sortColumnBy] < b[this.sortColumnBy]) {
            return -1
          }
          return 0
        } else {
          if (a[this.sortColumnBy] > b[this.sortColumnBy]) {
            return -1
          }
          if (a[this.sortColumnBy] < b[this.sortColumnBy]) {
            return 1
          }
          return 0
        }
      })
    },
    chosenCountOfConclusions() {
      return this.$store.getters.chosenCountOfConclusions
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
      return `top:${this.modal.coords.top}px;left:${this.modal.coords.right}px;right: auto;`
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
    sortedByCategory() {
      return this.$store.getters.sortedByCategory
    },
    sortColumnBy() {
      return this.$store.getters.sortColumnBy
    },
  },
  created() {
      this.$store.dispatch('getProducts')
  },
}
</script>

<style scoped lang="scss">
  .table {
    position: relative;
    min-height: 595px;

    &__loader {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
    }
  }
</style>
