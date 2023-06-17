<template>
  <div class="form-icon" :class="`form-icon--bg-${iconCssClass.bgColor}`">
    <i class="pi" :class="`pi-${iconCssClass.iconType}`">
    </i>
  </div>
</template>
<script>
export default {
  name: 'FormIcon',
  props: {
    formType: {
      type: String,
      required: true
    }
  },
  computed: {
    iconCssClass: function () {
      switch (this.formType) {
        case 'D':
          return { iconType: 'minus', bgColor: 'gray' };
        case 'L':
          return { iconType: 'times', bgColor: 'red' };
        default:
          return { iconType: 'check', bgColor: 'green' };
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
