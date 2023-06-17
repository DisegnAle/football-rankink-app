<template>
  <div>
    <ranking-table
      v-if="!isFetching"
      :data="rankingData"
      :table-columns="rankingTableColumns">
    </ranking-table>
    <skeleton-data-table
      v-else
      :table-columns="rankingTableColumns">
    </skeleton-data-table>
  </div>
</template>
<script>
import RankingTable from '@/components/RankingTable.vue';
import SkeletonDataTable from '@/components/SkeletonDataTable.vue';
import apis from '@/constants/apis';
export default {
  name: 'RankingView',
  components: {
    RankingTable,
    SkeletonDataTable
  },
  data () {
    return {
      rankingData: [],
      isFetching: false,
      visibleFields: [
        'intRank',
        'strTeamBadge',
        'strTeam',
        'strForm',
        'intPlayed',
        'intWin',
        'intDraw',
        'intLoss',
        'intGoalsFor',
        'intGoalsAgainst',
        'intGoalDifference',
        'intPoints',
      ]
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
    mapResponsePropsToTableHeaderFields (field) {
      switch (field) {
        case 'intGoalsAgainst':
          return 'GA';
        case 'intPoints':
          return 'Pts';
        case 'intGoalDifference':
          return 'GD';
        case 'intPlayed':
          return 'GP';
        case 'intGoalsFor':
          return 'GF';
        case 'intDraw':
          return 'D';
        case 'intLoss':
          return 'L';
        case 'intWin':
          return 'W';
        case 'strForm':
          return 'Form';
        default:
          return '';
      }
    }
  },
  computed: {
    rankingTableColumns () {
      return this.visibleFields.map((field) => {
        return {
          field,
          header: this.mapResponsePropsToTableHeaderFields(field)
        };
      });
    }
  }
}
</script>
