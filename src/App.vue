<template lang="pug">
  div(id="app")
    .wrapper
      Table
</template>

<script>
import Table from './components/Table/Table'

export default {
  name: 'App',
  components: {
    Table,
  },
}
</script>

<style lang="scss">
@import 'fonts/fonts.css';
@import 'common/color-variables';

body {
  font-family: Source Sans Pro, sans-serif;
  font-style: normal;
  font-weight: normal;
  color: $black;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 95%;
  margin: 3% auto;
}
</style>
