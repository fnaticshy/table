<template lang="pug">
  .filter
    .filter__text Sorting by
    ul.filter__list
      li(
        v-for="filter of filteredOptions"
        :key="filter.id"
        )
        BaseButton(
          type="filter"
          :text="filter.name"
          :class="{ 'active': filter.sortedBy }"
          @onClickBtn="sortingBy(filter.id)"
          )
    BaseButton(
      type="green"
      :text="`Delete ( ${ checkedItems.length } )`"
      @onClickBtn="deleteItems(checkedItems)"
      )
    BaseSelect(
      :options="countOfConclusions"
      @onClose="paginationIsOpen = false"
      @onOpen="paginationIsOpen = true"
      type="pagination"
      :isOpen="paginationIsOpen"
    )
    Pagination(
      :pageCount="pageCount"
      @onPrevPage="$emit('onPrevPage')"
      @onNextPage="$emit('onNextPage')"
    )
    BaseSelect(
      :options="filterOptions"
      @onClose="filterIsOpen = false"
      @onOpen="filterIsOpen = true"
      @onSelectAll="selectAllHandler"
      type="filter"
      :isOpen="filterIsOpen"
      :isEverythingSelected="isEverythingSelected"
    )

</template>

<script>
import BaseButton from '../BaseButton'
import BaseSelect from '../BaseSelect'
import Pagination from '../Pagination'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'TableFilter',
  components: {
    BaseSelect,
    BaseButton,
    Pagination,
  },
  computed: {
    isEverythingSelected() {
      return this.$store.getters.isEverythingSelected
    },
  },
  data() {
    return {
      filterIsOpen: false,
      paginationIsOpen: false,
    }
  },
  props: {
    pageCount: {
      type: Object,
      required: true,
    },
    filterOptions: {
      type: Array,
      required: true,
    },
    filteredOptions: {
      type: Array,
      required: true,
    },
    countOfConclusions: {
      type: Array,
      required: true,
    },
    checkedItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteItems(items) {
      // this.$emit('onOpenModal', event);
      this.$store.dispatch('deleteProducts', items)
    },
    sortingBy(id) {
      this.$store.dispatch('updateSortedBy', id)
    },
    selectAllHandler() {
      this.$store.dispatch('isEverythingSelected')
      this.$store.dispatch('updateAll', this.isEverythingSelected)
    },
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style scoped lang="scss">
@import 'src/common/mixins.scss';
@import 'src/common/color-variables.scss';

.filter {
  display: flex;
  align-items: center;
  background-color: $alabaster;

  &__text {
    font-weight: 600;
  }

  &__list {
    @include list-reset;
    display: flex;
  }
}
</style>
