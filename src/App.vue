<template>
  <div class="fr">
    <div class="p-grid fr__ranking-view-container">
      <div class="p-col-12 lg:col-11">
        <ranking-view></ranking-view>
      </div>
    </div>
  </div>
</template>
<script>
import RankingView from './views/RankingView.vue';
export default {
  name: 'App',
  components: {
    RankingView
  }
}
</script>

<style lang="scss">
@import '/src/assets/themes/material/theme.css';
@import '/node_modules/primeflex/primeflex.css';
@import '/node_modules/primeicons/primeicons.css';

@media screen and (min-width: 769px) {
  html,
  body,
  .fr {
    height: 100%;
  }

  .fr {
    background: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);

    &__ranking-view-container {
      height: 100%;
      align-content: center;
      justify-content: center;
    }
  }
}
</style>
