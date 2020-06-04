<template lang="pug">
  .select(v-click-outside="closeSelect")
    .select__btn(@click="openSelect")
      div(v-if="type === 'filter'") {{ activeFilters.length }} columns selected
      div(v-else) {{ activeFilters[0].name }}

    ul.select__wrapper(
      v-if="isOpen"
      )
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
        @click="optionHandler(option.id)"
        :class="{'active' : option.isActive}"
        :key="option.name"
        )
        Checkbox(
          @onChangeValue="optionHandler(option.id)"
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
  computed: {
    activeFilters() {
      return this.options.filter((el) => el.isActive === true)
    },
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
  methods: {
    closeSelect() {
      this.$emit('onClose')
    },
    openSelect() {
      this.$emit('onOpen')
    },
    optionHandler(id) {
      this.$store.dispatch('updateFilters', {
        id,
        type: this.type,
      })
    },
    selectAll() {
      this.$emit('onSelectAll')
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
    padding: 4px 20px;
    border: 1px solid $mischka;
    border-radius: $border-radius-btn;
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
    z-index: 3;
    background-color: $white;
    box-shadow: $shadow;
    border-radius: $border-radius-modal;
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>
