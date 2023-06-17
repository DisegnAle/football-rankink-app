<template>
  <div class="form-icon" :class="`form-icon--bg-${formIconBgCssClass}`">
    <i class="pi" :class="`pi-${iconTypeCssClass}`"></i>
  </div>
</template>
<script>
export default {
  name: 'FormIcon',
  props: ['formType'],
  computed: {
    iconTypeCssClass: function () {
      switch (this.formType) {
        case 'D':
          return 'minus';
        case 'L':
          return 'times';
        default:
          return 'check';
      }
    },
    formIconBgCssClass: function () {
      switch (this.formType) {
        case 'D':
          return 'gray';
        case 'L':
          return 'red';
        default:
          return 'green';
      }
    }
  }
}
</script>

<style lang="scss">
.form-icon {
  display: inline-block;
  border-radius: 60px;
  padding: 0.5em 0.6em;
  margin-right: 10px;
  color: var(--surface-0);

  &--bg {
    &-green {
      background: var(--green-300);
    }

    &-red {
      background: var(--red-300);
    }

    &-gray {
      background: var(--surface-500);
    }
  }
}
</style>
