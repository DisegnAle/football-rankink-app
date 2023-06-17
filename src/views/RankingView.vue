<template>
  <ranking-table
    :is-fetching="isFetching"
    :ranking-data="rankingData">
  </ranking-table>
</template>
<script>
import RankingTable from '@/components/RankingTable.vue';
import apis from '@/constants/apis';
export default {
  name: 'RankingView',
  components: {
    RankingTable
  },
  data () {
    return {
      rankingData: [],
      isFetching: false,
    }
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    onFetchData () {
      try {
        this.isFetching = true;
        this.fetchData();
      } catch (e) {
        console.error(e);
      } finally {
        this.isFetching = false;
      }
    },
    async fetchData () {
      const response = await fetch(apis.RANKING);
      const parsedResponse = await response.json();
      this.rankingData = [...parsedResponse.table];
    },
  },
}
</script>
