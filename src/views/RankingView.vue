<template>
  <div>
    <Card class="fr-card__ranking-view">
      <template #content>
        <ranking-table v-if="!isFetching" :data="rankingData" :table-columns="rankingTableColumns">
        </ranking-table>
        <skeleton-data-table v-else :table-columns="rankingTableColumns">
        </skeleton-data-table>
      </template>
      <template #footer>
        <Button label="Load more" class="p-button-primary p-button-text cursor-pointer" />
      </template>
    </Card>
  </div>
</template>
<script>
import RankingTable from '@/components/RankingTable.vue';
import SkeletonDataTable from '@/components/SkeletonDataTable.vue';
import apis from '@/constants/apis';
import Button from 'primevue/button';
import Card from 'primevue/card';
export default {
  name: 'RankingView',
  components: {
    Card,
    Button,
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
    this.onFetchData();
  },
  methods: {
    onFetchData () {
      try {
        this.isFetching = true;
        this.fetchData();
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => {
          this.isFetching = false;
        }, 1000);
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

<style lang="scss">
.fr-card__ranking-view {
  .p-card-content {
    max-height: 90vh;
    overflow: auto;
  }
}
</style>
