<template lang="pug">
  button.btn(
    :class="btnClass"
    @click="clickHandler($event)"
    ) {{ text }}
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      validator: (val) => ['default', 'green', 'filter'].includes(val),
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    btnClass() {
      return `btn--${this.type}`
    },
  },
  methods: {
    clickHandler(event) {
      this.$emit('onClickBtn', event)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../common/color-variables';
@import '../common/size-variables';

.btn {
  font-size: 14px;
  line-height: 24px;
  padding: 3px 5px;
  border: 1px solid;
  border-radius: $border-radius-btn;
  transition: all 200ms;
  min-width: 76px;
  outline: none;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }

  &--green {
    background-color: $confirm;
    color: $white;
    border-color: $confirm;

    &:hover {
      border-color: lighten($confirm, 10%);
      background-color: lighten($confirm, 10%);
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;

      &:hover {
        background-color: $confirm;
        color: $white;
        border-color: $confirm;
      }
    }
  }

  &--default {
    background-color: $default;
    color: $comet;
    border-color: $ghost;

    &:hover {
      color: $red;
      border-color: lighten($ghost, 10%);
      background-color: darken($default, 10%);
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;

      &:hover {
        background-color: $ghost;
        color: $comet;
        border-color: $ghost;
      }
    }
  }

  &--filter {
    background-color: $filter;
    border-color: $filter;

    &:hover {
      border-color: darken($filter, 10%);
      background-color: darken($filter, 10%);
    }

    &.active {
      background-color: $active-color;
      border-color: $active-color;
      color: $white;

      &:hover {
        border-color: lighten($active-color, 10%);
        background-color: lighten($active-color, 10%);
      }
    }
  }
}
</style>
