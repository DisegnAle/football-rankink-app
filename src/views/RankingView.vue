<template>
  <Card class="fr-ranking-view__card">
    <template #header>
      <Button v-if="loadMoreButtonIsShown" label="Load more" class="p-button-primary p-button-text cursor-pointer"
        @click="onLoadMoreButtonClick" />
    </template>
    <template #content>
      <div ref="cardContentInner">
        <ranking-table v-if="!isFetching" :data="shownRankingData" :table-columns="rankingTableColumns">
        </ranking-table>
        <skeleton-data-table v-else :table-columns="rankingTableColumns">
        </skeleton-data-table>
      </div>
    </template>
  </Card>
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
      ],
      recordsToShow: 5
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
    },
    updateRecordsToShow () {
      if (this.recordsToShow + 3 >= this.rankingData.length) {
        this.recordsToShow = this.rankingData.length;
      } else {
        this.recordsToShow += 3;
      }
    },
    onLoadMoreButtonClick () {
      if (this.recordsToShow.length === this.rankingData.length) {
        return;
      }

      this.updateRecordsToShow();
      this.scrollTo();
    },
    scrollToBottom () {
      this.$refs.cardContentInner.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'smooth'
      });
    },
    scrollToItem () {
      const item = document.getElementById(`row-${this.recordsToShow - 2}`);
      item.scrollIntoView({ behavior: 'smooth' }, true);
    },
    scrollTo () {
      setTimeout(() => {
        if (window.innerWidth >= 961) {
          this.scrollToBottom();
        } else {
          this.scrollToItem();
        }
      }, 300);
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
    },
    shownRankingData () {
      return this.rankingData.slice(0, this.recordsToShow);
    },
    loadMoreButtonIsShown () {
      return this.rankingData.length > 0 && this.recordsToShow !== this.rankingData.length;
    }
  }
}
</script>

<style lang="scss">
.fr-ranking-view__card {
  .p-card-content {
    max-height: 90vh;
    overflow: scroll;
  }
}

@media screen and (min-width: 1200px) {
  .fr-ranking-view__card {
    .p-card-content {
      max-height: 75vh;
    }
  }
}
</style>
