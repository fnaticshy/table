<template lang="pug">
  label.checkbox
    input.checkbox__input(
      type="checkbox"
      :checked="isChecked"
      @change="checkboxHandler"
      )
    span.checkbox__checkmark
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkboxHandler() {
      this.$emit('onChangeValue')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../common/color-variables';
@import '../common/size-variables';

.checkbox {
  display: block;
  position: relative;
  padding-left: 14px;
  margin-bottom: 14px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    border: 1px solid $ghost;
    border-radius: $border-radius-checkbox;
  }

  & .checkbox__input:checked ~ .checkbox__checkmark {
    background-color: $fun-green;
    border-color: $fun-green;
  }

  &:hover .checkbox__input ~ .checkbox__checkmark {
    border-color: lighten($fun-green, 5%);
  }

  &__checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  & .checkbox__input:checked ~ .checkbox__checkmark:after {
    display: block;
  }

  & .checkbox__checkmark:after {
    left: 4px;
    top: 0;
    width: 5px;
    height: 10px;
    border: solid $white;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
