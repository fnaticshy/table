<template lang="pug">
  .select(v-click-outside="closeSelect")
    .select__btn(@click="openSelect")
      i.select__icon
        simple-svg(:src="arrowSmall" custom-class-name="select__icon")
      div.select__text(v-if="type === 'filter'") {{ activeFilters.length }} columns selected
      div.select__text(v-else) {{ activeFilters[0].name }}

    ul.select__wrapper(v-if="isOpen")
      li(
        v-if="type === 'filter'"
        class="select__item"
        @click="selectAll"
        )
        Checkbox(
          @onChangeValue="selectAll"
          :is-checked="isEverythingSelected"
        )
        .select__text Select all
      li(
        class="select__item"
        v-for="option of options"
        @click="optionHandler(option)"
        :class="{'active' : option.isActive}"
        :key="option.name"
        )
        Checkbox(
          @onChangeValue="optionHandler(option)"
          :is-checked="option.isActive"
          )
        .select__text {{ option.name }}
</template>

<script>
import ClickOutside from 'vue-click-outside'
import Checkbox from './Checkbox'

export default {
  name: 'BaseSelect',
  components: {
    Checkbox,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      require: true,
      validator: (val) => ['pagination', 'filter'].includes(val),
    },
    isEverythingSelected: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      arrowSmall: require(`@/assets/icons/${'arrow-small'}.svg`),
    }
  },
  methods: {
    closeSelect() {
      this.$emit('onClose')
    },
    openSelect() {
      if (this.isOpen) {
        this.$emit('onClose')
      } else {
        this.$emit('onOpen')
      }
    },
    optionHandler(el) {
      if (this.type === 'pagination') this.$emit('onClose')
      this.$store.dispatch('updateFilters', {
        el,
        type: this.type,
      })
      this.$store.dispatch('resetSortingBy')
    },
    selectAll() {
      this.$emit('onSelectAll')
    },
  },
  computed: {
    activeFilters() {
      return this.options.filter((el) => el.isActive === true)
    },
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style scoped lang="scss">
@import '../common/mixins';
@import '../common/color-variables';
@import '../common/size-variables';

.select {
  position: relative;

  &__btn {
    position: relative;
    color: $comet;
    padding: 4px 27px 4px 13px;
    border: 1px solid $mischka;
    border-radius: $border-filter-items;

    &:hover {
      cursor: pointer;
    }
  }

  &__text {
    @include ellipsis;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 8px;
    height: 5px;
    top: 0;
    right: 12px;
    color: $comet;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;

    &__icon {
      position: absolute;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    padding-right: 17px;
    padding-left: 17px;

    &:hover {
      background-color: $panache;
      cursor: pointer;
    }
  }

  &__item & {
    &__text {
      white-space: nowrap;
      padding-left: 14px;
    }
  }

  &__wrapper {
    @include list-reset;
    position: absolute;
    right: 0;
    z-index: 3;
    background-color: $white;
    box-shadow: $shadow;
    border-radius: $border-radius-modal;
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>
