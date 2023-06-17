<template>
    <DataTable v-if="rankingData" :value="rankingData">
      <Column field="intRank"></Column>
      <Column field="strTeamBadge">
        <template #body="slotProps">
            <img :src="slotProps.data.strTeamBadge" :alt="`${slotProps.data.strTeam} crest`" />
        </template>
      </Column>
      <Column field="strTeam"></Column>
      <Column field="strTeamBadge">
        <template #body="slotProps">
            <form-icon
              v-for="(icon, index) in slotProps.data.strForm.split('')"
              :key="`${icon}-${index}`"
              :form-type="icon">
            </form-icon>
        </template>
      </Column>
      <Column field="intPlayed" header="GP"></Column>
      <Column field="intWin" header="W"></Column>
      <Column field="intDraw" header="D"></Column>
      <Column field="intLoss" header="L"></Column>
      <Column field="intGoalsFor" header="GF"></Column>
      <Column field="intGoalsAgainst" header="GA"></Column>
      <Column field="intGoalDifference" header="GD"></Column>
      <Column field="intPoints" header="Pts"></Column>
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
      isFetching: false
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
      this.rankingData = [...parsedResponse.table ];
    }
  }
}
</script>
