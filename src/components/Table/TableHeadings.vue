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
        span.table-heading__inner(@click="$emit('onSortColumnByField', item.id)") {{ item.name }}
        i.table-heading__icon
          simple-svg(:src="arrowUp")

</template>

<script>
import Checkbox from '../Checkbox'

export default {
  name: 'TableHeadings',
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
  computed: {
    sortedHeadings() {
      return [...this.headings].sort((a) => {
        if (a.value.includes(this.sortedByCategory)) {
          return -1
        } else {
          return 1
        }
      })
    },
    sortedByCategory() {
      return this.$store.getters.sortedByCategory
    },
  },
  data() {
    return {
      arrowUp: require(`@/assets/icons/${'arrow-up'}.svg`),
    }
  },
  methods: {
    selectAll() {
      this.$emit('onSelectAll')
    },
  },
  components: {
    Checkbox,
  },
}
</script>

<style scoped lang="scss">
@import '../../common/color-variables';
@import '../../common/mixins';

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
/*common*/
$spacer: 8px;

.table-heading {
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 600;
  border-bottom: 1px solid $gallery;

  &__inner {
    &:hover {
      cursor: pointer;
    }
  }

  &__checkbox {
    width: $checkbox-width-in-percent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: $spacer;
    @include ellipsis;
  }

  &__desc {
    width: $desc-width-in-percent;
    padding-right: $spacer;
    @include ellipsis;

    &.active {
      color: $fun-green;

      .table-heading__icon {
        display: block;
      }
    }

    &:last-child {
      padding-right: $offset;
    }
  }

  &__icon {
    color: $black;
    display: none;
  }
}
</style>
