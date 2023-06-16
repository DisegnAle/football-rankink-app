<template>
  <div class="ft__ranking-view">
    <ranking-table-vue></ranking-table-vue>
  </div>
</template>
<script>
import RankingTableVue from '../components/RankingTable.vue'
export default {
  name: 'RankingView',
  components: {
    RankingTableVue
  }
}
</script>
