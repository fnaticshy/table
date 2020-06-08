<template lang="pug">
  .pagination
    .pagination__controls
      button.pagination__btn.pagination__btn--left(
        @click="$emit('onNextPage')"
        :disabled="!minimalIndex"
        )
        i.pagination__icon
          simple-svg(:src="arrowSmall")
      span.pagination__text
        span.pagination__count {{ textStart }}
        | &nbsp of &nbsp
        span.pagination__count {{ pageCount.count }}
      button.pagination__btn.pagination__btn--right(
        @click="$emit('onPrevPage')"
        :disabled="pageCount.end >= pageCount.count"
        )
        i.pagination__icon
          simple-svg(:src="arrowSmall")
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageCount: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      arrowSmall: require(`@/assets/icons/${'arrow-small'}.svg`),
    }
  },
  computed: {
      chosenCountOfConclusions() {
          return this.$store.getters.chosenCountOfConclusions
      },
      minimalIndex() {
          console.log((this.chosenCountOfConclusions - this.pageCount.end) > 0)
            return (this.pageCount.end - this.chosenCountOfConclusions) > 0
      },
      textStart() {
          const from = this.pageCount.start === 0 ? 1 : this.pageCount.start
          //ToDo bug with 'to'
          let to = this.pageCount.end > this.pageCount.count ? this.pageCount.count : this.pageCount.end
          return `${from} - ${to}`
      }
  }
}
</script>

<style scoped lang="scss">
@import '../common/size-variables';
@import '../common/color-variables';

.pagination {
  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__btn {
    width: 32px;
    height: 32px;
    border: 1px solid $ghost;
    outline: none;
    background-color: $transparent;
    box-sizing: border-box;
    border-radius: $border-filter-items;

    &--left {
      transform: rotate(90deg);
    }

    &--right {
      transform: rotate(-90deg);
    }

    &:disabled {
      opacity: 0.3;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }

  &__text {
    padding-right: 8px;
    padding-left: 8px;
  }

  &__count {
    font-weight: 600;
  }
}
</style>
