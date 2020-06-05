<template lang="pug">
  .modal-tooltip
    p
      | Are you sure you want to &nbsp
      span delete item
      | ?

    .modal-tooltip__controls
      BaseButton(
        class="modal-tooltip__btn"
        text="Cancel"
        type="default"
        @onClickBtn="cancelAction"
        )
      BaseButton(
        class="modal-tooltip__btn"
        text="Confirm"
        type="green"
        @onClickBtn="confirmAction"
        )
</template>

<script>
import BaseButton from './BaseButton'

export default {
  name: 'ModalTooltip',
  components: {
    BaseButton,
  },
  props: {
    visibility: {
      type: Boolean,
    },
  },
  methods: {
    confirmAction() {
      this.$emit('onAction')
    },
    cancelAction() {
      this.$emit('onCancel')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../common/color-variables';
@import '../common/size-variables';

.modal-tooltip {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: $white;
  border-radius: $border-radius-modal;
  z-index: 2;
  right: 0;
  min-width: 222px;
  max-width: 508px;
  box-shadow: $shadow;

  p {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: center;

    span {
      font-weight: 600;
    }
  }

  &__controls {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__btn {
    &:first-child {
      margin-right: 16px;
    }
  }
}
</style>
