<template>
    <i
      class="pi fr-form-icon"
      :class="[
        `pi-${iconCssClasses.iconType}`,
        `fr-form-icon--bg-${iconCssClasses.bgColor}`
      ]">
    </i>
</template>
<script>
export default {
  name: 'FormIcon',
  props: {
    /**
      * The size of the button
      * @values W, D, L
      */
    formType: {
      type: String,
      required: true
    }
  },
  computed: {
    /**
     * It determines some css classes according to the formType passed as a prop
     * These classes will be used to set the type and the background color of
     * the icon
     *
     */
    iconCssClasses: function () {
      switch (this.formType) {
        case 'D':
          return { iconType: 'minus', bgColor: 'orange' };
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
$green: #7EB77F;
$red: #DB5461;
$orange: #FA9F42;

.fr-form-icon {
  display: inline-block;
  border-radius: 50%;
  padding: 0.6em 0.6em;
  margin-right: 5px;
  color: var(--surface-0);
  &.pi{
    font-size: 0.6em;
  }

  @media screen and (min-width: 1200px) {
    margin-right: 10px;
    &.pi {
      font-size: 0.8em;
    }
  }


  &--bg {
    &-green {
      background: $green;
    }

    &-red {
      background: $red;
    }

    &-orange {
      background: $orange;
    }
  }
}
</style>
