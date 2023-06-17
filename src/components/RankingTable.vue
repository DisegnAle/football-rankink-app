<template>
  <DataTable :value="rankingData">
    <Column v-for="col of rankingTableColumns" :field="col.field" :header="col.header" :key="col.field">
      <template #body="slotProps">
        <img v-if="col.field === 'strTeamBadge'" :src="slotProps.data.strTeamBadge"
          :alt="`${slotProps.data.strTeam} crest`" />
        <form-icon v-else-if="col.field === 'strForm'" v-for="(icon, index) in slotProps.data.strForm.split('')"
          :key="`${icon}-${index}`" :form-type="icon">
        </form-icon>
        <span v-else>
          {{ slotProps.data[col.field] }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import apis from '@/constants/apis';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import FormIcon from './FormIcon.vue';
export default {
  name: 'RankingTable',
  components: {
    DataTable,
    Column,
    FormIcon
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
