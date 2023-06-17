<template>
  <div id="app">
    <div class="p-grid">
      <div class="p-col">
        <Ranking></Ranking>
      </div>
    </div>
  </div>
</template>
<script>
import Ranking from './views/Ranking.vue';
export default {
  name: 'App',
  components: {
    Ranking
  }
}
</script>

<style>
@import './assets/themes/material/theme.css';
@import '/node_modules/primeflex/primeflex.css';
</style>
