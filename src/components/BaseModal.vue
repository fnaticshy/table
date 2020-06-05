<template lang="pug">
  transition(name='modal')
    .modal-mask
      .modal-wrapper
        .modal-container
          .modal-header
            slot(name='header')
              | default header
          .modal-body
            slot(name='body')
              | default body
          .modal-footer
            BaseButton(
              class="filter__wrapper-element"
              type="green"
              text="Reconnect"
              @onClickBtn="$emit('onClose')"
            )
</template>

<script>
import BaseButton from "./BaseButton";

export default {
    name: "BaseModal",
    components: {
        BaseButton,
    }
}
</script>

<style scoped lang="scss">
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  h3 {
    margin-top: 0;
    color: #42b983;
  }
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
  .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.modal-leave-active {
  opacity: 0;
  .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
