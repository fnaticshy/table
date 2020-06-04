<template lang="pug">
  .pagination
    .pagination__controls
      button.pagination__btn.pagination__btn--left(
        @click="$emit('onNextPage')"
        :disabled="pageCount.page === 0"
        ) left
      span {{ pageCount.start }} - {{ pageCount.end }} of {{ pageCount.count }}
      button.pagination__btn.pagination__btn--right(
        @click="$emit('onPrevPage')"
        :disabled="pageCount.page >= pageCount.pageCount - 1"
        ) right
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageCount: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
