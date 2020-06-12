<template lang="pug">
  .table-heading(v-if="headings.length !== 0")
    .table-heading__checkbox
      Checkbox(
        @onChangeValue="selectAll"
        :isChecked="areAllItemsSelected"
        )
    .table-heading__desc(
      v-for="item of sortedHeadings"
      :class="{ 'active': item.sortByColumn }")
        .table-heading__text-wrapper
          span.table-heading__inner(@click="$emit('onSortColumnByField', item.id)") {{ item.name }}
          i.table-heading__icon
            simple-svg(:src="arrow")

</template>

<script>
import Checkbox from '../Checkbox'

export default {
  name: 'TableHeadings',
  components: {
    Checkbox,
  },
  props: {
    headings: {
      type: Array,
      required: true,
    },
    areAllItemsSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      arrow: require(`@/assets/icons/${'arrow'}.svg`),
    }
  },
  methods: {
    selectAll() {
      this.$emit('onSelectAll')
    },
  },
  computed: {
    sortedHeadings() {
      return [...this.headings].sort((a) => {
        if (a.value.includes(this.sortedByCategoryVal)) {
          return -1
        } else {
          return 1
        }
      })
    },
    sortedByCategoryVal() {
      return this.$store.getters.sortedByCategoryVal
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../common/color-variables';
@import '../../common/mixins';
@import '../../common/size-variables';

/*data-in*/
$width-from-model: 1140px;
$checkbox-block-width-from-model: 65px;
$common-desc-block-width-from-model: 917px;
$offset-block-width-from-model: 158px;
/*blocks width*/
$checkbox-width-in-percent: $checkbox-block-width-from-model/$width-from-model *
  100%;
$desc-width-in-percent: $common-desc-block-width-from-model/$width-from-model *
  100%/6;
/*offset width */
$offset: $offset-block-width-from-model/$width-from-model * 100%;

.table-heading {
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 600;
  border-bottom: 1px solid $gallery;

  &__checkbox {
    width: $checkbox-width-in-percent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: $spacer;
    @include ellipsis;
  }

  &__text-wrapper {
    position: relative;
    padding-right: 12px;
    @include ellipsis;
  }

  &__desc {
    width: $desc-width-in-percent;
    padding-right: $spacer;

    &.active {
      color: $fun-green;

      .table-heading__icon {
        display: block;
      }
    }

    &:nth-child(2) {
      cursor: pointer;
    }

    &:last-child {
      padding-right: $offset;
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    color: $black;
    display: none;
  }
}
</style>
