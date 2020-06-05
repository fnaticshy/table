<template lang="pug">
  .filter
    .filter__text Sorting by:
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
    .filter__wrapper
      BaseButton(
        class="filter__wrapper-element"
        type="green"
        data-type="heap"
        :disabled="checkedItems.length === 0"
        :text="`Delete ( ${ checkedItems.length } )`"
        @onClickBtn="deleteItems"
        )
      BaseSelect(
        class="filter__wrapper-element"
        :options="countOfConclusions"
        @onClose="paginationIsOpen = false"
        @onOpen="paginationIsOpen = true"
        type="pagination"
        :isOpen="paginationIsOpen"
      )
      Pagination(
        class="filter__wrapper-element"
        :pageCount="pageCount"
        @onPrevPage="$emit('onPrevPage')"
        @onNextPage="$emit('onNextPage')"
      )
      BaseSelect(
        class="filter__wrapper-element"
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
  data() {
    return {
      filterIsOpen: false,
      paginationIsOpen: false,
    }
  },
  methods: {
    deleteItems(event) {
      this.$emit('onOpenModal', event)
    },
    sortingBy(id) {
      this.$emit('onSortingBy', id)
    },
    selectAllHandler() {
      this.$store.dispatch('isEverythingSelected')
      this.$store.dispatch('updateAll', this.isEverythingSelected)
    },
  },
  computed: {
    isEverythingSelected() {
      return this.$store.getters.isEverythingSelected
    },
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style scoped lang="scss">
@import 'src/common/size-variables.scss';
@import 'src/common/mixins.scss';
@import 'src/common/color-variables.scss';

.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid $gallery;
  padding-top: 15px;
  padding-bottom: 16px;
  background-color: $alabaster;

  @media (max-width: $md) {
    flex-direction: column;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 50%;

    @media (max-width: $md) {
      width: 100%;
    }
  }

  &__wrapper-element {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__text {
    white-space: nowrap;
    padding-right: 6px;
    font-weight: 600;
  }

  &__list {
    @include list-reset;
    display: flex;
    width: 50%;

    @media (max-width: $md) {
      width: 100%;
    }
  }
}
</style>
