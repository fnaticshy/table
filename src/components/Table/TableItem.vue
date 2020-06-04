<template lang="pug">
  .table-item(v-if="!isEmptyItem")
    .table-item__wrapper
      .table-item__checkbox
        Checkbox(
          @onChangeValue="isCheckedHandler"
          :isChecked="checked"
          )
      .table-item__desc(v-for="value of filteredItem")
          span.table-item__inner {{ value }}
    .table-item__button
      button(@click="openModal($event)")
        simple-svg(:src="rubbishBinSrc")
        span delete

</template>

<script>
import Checkbox from '../Checkbox'

export default {
  name: 'TableItem',
  components: {
    Checkbox,
  },
  computed: {
    sortedByCategory() {
      return this.$store.getters.sortedByCategory
    },
    isEmptyItem() {
      return (
        Object.keys(this.filteredItem).length === 0 &&
        this.filteredItem.constructor === Object
      )
    },
    filteredItem() {
      const obj = {}

      for (let [key, value] of Object.entries(this.item)) {
        if (key !== 'id' && key !== 'chosen') {
          obj[key] = value
        }
      }

      return this.sortObjBuyValue(obj, this.sortedByCategory)
    },
  },
  props: {
    item: {
      type: Object,
      requires: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rubbishBinSrc: require(`@/assets/icons/${'rubbish-bin'}.svg`),
    }
  },
  methods: {
    sortObjBuyValue(obj, val) {
      const sortable = []
      const objSorted = {}

      for (let [key, value] of Object.entries(obj)) {
        sortable.push([key, value])
      }

      sortable.sort((a) => {
        if (a[0].includes(val)) {
          return -1
        } else {
          return 1
        }
      })

      sortable.forEach((item) => {
        objSorted[item[0]] = item[1]
      })

      return objSorted
    },
    openModal(event) {
      this.$emit('onOpenModal', event)
    },
    isCheckedHandler() {
      this.$emit('onAddToDeletion', {
        id: this.item.id,
      })
    },
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

.table-item {
  position: relative;
  transition: all 200ms;

  &:nth-child(2n) {
    background: $athens-gray;
  }

  &:hover {
    cursor: pointer;
    background-color: $panache;

    .table-item__button {
      display: block;
      top: 13px;
      right: 32px;
    }
  }

  &__wrapper {
    display: flex;
    padding-top: 12px;
    padding-bottom: 12px;
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

    &:last-child {
      padding-right: $offset;
    }
  }

  &__button {
    display: none;
    position: absolute;
    right: 32px;
    cursor: pointer;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      color: $comet;
      border: 0;
      outline: none;
      cursor: pointer;

      &:hover {
        color: lighten($comet, 10%);
      }

      span {
        margin-left: 4px;
      }
    }
  }
}
</style>
