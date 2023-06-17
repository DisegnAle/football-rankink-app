<template>
  <div id="app">
    <div class="p-grid">
      <div class="p-col">
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

<style>
@import './assets/themes/material/theme.css';
@import '/node_modules/primeflex/primeflex.css';
@import '/node_modules/primeicons/primeicons.css';
</style>
