<template>
  <!--
    Card component - Available in Primevue library
  -->
  <Card class="fr-ranking-view__card">
    <template #header>
      <div v-if="isCardHeaderContentShown" class="p-col-12">
        <div class="p-grid p-p-2 fr-ranking-view__card-header">
          <!--
            InputText component - Available in Primevue library
            Used for filtering in the datatable against the teams' names
          -->
          <div class="p-mr-2">
            <span class="p-input-icon-left">
              <i class="pi pi-filter" />
              <InputText class="p-inputtext-sm" v-model="rankingTableFilter" placeholder="Team club name" />
            </span>
          </div>
          <!--
            Button component - Available in Primevue library
            Used for loading more records in the datatable
            @event click
          -->
          <div>
            <Button v-if="isLoadMoreButtonShown" label="Load more" class="p-button-primary p-button-text cursor-pointer"
              @click="onLoadMoreButtonClick" />
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <div ref="cardContentInner">
        <!--
            RankingTable component
            Used for showing fetched data
          -->
        <ranking-table v-if="!isFetching" :data="rankingDataShown" :table-columns="rankingTableColumns"
          :table-filter="rankingTableFilter">
        </ranking-table>
        <!--
            SkeletonDataTable component
            Used for showing a skeleton while the data is being fetched
          -->
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
import InputText from 'primevue/inputtext';
export default {
  name: 'RankingView',
  components: {
    Card,
    Button,
    InputText,
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
      recordsToShow: 5,
      rankingTableFilter: null,
    }
  },
  mounted () {
    this.onFetchData();
  },
  methods: {
    /**
     * Calls the fetchData fn and set the isFetching property
     *
     */
    onFetchData () {
      try {
        this.isFetching = true;
        this.fetchData();
      } catch (e) {
        console.error(e);
      } finally {
        // Timeout set for demo purposes
        // Normally, since the time for fetching data is very short
        // the skeleton would barely be visible
        setTimeout(() => {
          this.isFetching = false;
        }, 2000);
      }
    },
    /**
     * Calls the native fetch fn and when it receives the response,
     * it sets the rankingData equal to the response received.
     *
     */
    async fetchData () {
      const response = await fetch(apis.RANKING);
      const parsedResponse = await response.json();
      this.rankingData = [...parsedResponse.table];
    },
    /**
     * It maps the properties of the fetched records to the visible headers
     * in the datatable columns.
     *
     * @param {string} field
     */
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
    /**
     * The records shown by default are set to 5.
     * Everytime the users clicks on the "load more" button, it adds 3 to the
     * recordsToShow.
     * If the recordsToShow is greater than or equal to the fetched rankingData,
     * it automatically assigns it to the rankingData.
     *
     */
    updateRecordsToShow () {
      if (this.recordsToShow + 3 >= this.rankingData.length) {
        this.recordsToShow = this.rankingData.length;
      } else {
        this.recordsToShow += 3;
      }
    },
    /**
     * Triggered by the "load more" button click event
     *
     */
    onLoadMoreButtonClick () {
      if (this.recordsToShow.length === this.rankingData.length) {
        return;
      }
      this.resetRankingTableFilter();
      this.updateRecordsToShow();
      this.scrollTo();
    },
    /**
     * It scrolls the datatable container to the bottom
     * (only on large devices)
     *
     */
    scrollToBottom () {
      this.$refs.cardContentInner.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'smooth'
      });
    },
    /**
     * It scrolls the datatable container to the first of the new three shown
     * records.
     * (only on small devices)
     *
     */
    scrollToItem () {
      const item = document.getElementById(`row-${this.recordsToShow - 2}`);
      item.scrollIntoView({ behavior: 'smooth' }, true);
    },
    /**
     * Since, when the user clicks on the "load more" button, he should scroll to
     * view the new displayed records, this function automatically manages
     * the scrolling logic.
     *
     */
    scrollTo () {
      setTimeout(() => {
        if (window.innerWidth >= 961) {
          this.scrollToBottom();
        } else {
          this.scrollToItem();
        }
      }, 300);
    },
    resetRankingTableFilter () {
      this.rankingTableFilter = null;
    }
  },
  computed: {
    /**
     * It dinamically generates an array of objects, passed to the datatables.
     * Every object contains the field (property) of the fetched data and the
     * header shown in the datatable headers.
     *
     */
    rankingTableColumns () {
      return this.visibleFields.map((field) => {
        return {
          field,
          header: this.mapResponsePropsToTableHeaderFields(field)
        };
      });
    },
    /**
     * It reduces the shown ranking data according to the records to show.
     *
     */
    rankingDataShown () {
      return this.rankingData.slice(0, this.recordsToShow);
    },
    /**
     * It determines whether to show the card header content
     * (filter and load more button).
     *
     */
    isCardHeaderContentShown () {
      return this.isLoadMoreButtonShown &&
        this.isFetching === false;
    },
    /**
     * It determines whether to show the "load more" button
     *
     */
    isLoadMoreButtonShown () {
      return this.rankingData.length > 0 &&
        this.recordsToShow !== this.rankingData.length;
    }
  }
}
</script>

<style lang="scss">
.fr-ranking-view__card {
  &-header {
    min-height: 65px;
    justify-content: flex-start;
  }

  .p-card-content {
    max-height: 90vh;
    overflow: scroll;
  }

  .p-input-icon-left {
    position: relative;

    i {
      position: absolute;
      top: 15%;
    }
  }
}

@media screen and (min-width: 1200px) {
  .fr-ranking-view__card {
    min-height: 75vh;

    .p-card-content {
      max-height: 75vh;
    }
  }
}
</style>
