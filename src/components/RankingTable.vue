<template>
  <DataTable removableSort :value="data" class="p-datatable-sm fr-ranking-table">
    <Column :sortable="isSortingBtnShown(col.field)" v-for="col of tableColumns" :field="col.field" :header="col.header"
      :key="col.field">
      <template #body="slotProps">
        <div v-if="col.field === 'strTeamBadge'">
          <img :src="slotProps.data.strTeamBadge" :alt="`${slotProps.data.strTeam} crest`" />
        </div>
        <div v-else-if="col.field === 'strForm'">
          <form-icon v-for="(icon, index) in slotProps.data.strForm.split('')" :key="`${icon}-${index}`"
            :form-type="icon">
          </form-icon>
        </div>
        <span v-else-if="col.field === 'intRank'" :id="`row-${slotProps.data.intRank}`">
          {{ slotProps.data[col.field] }}
        </span>
        <span v-else>
          {{ slotProps.data[col.field] }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
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
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      required: true
    }
  },
  methods: {
    isSortingBtnShown (field) {
      return !['strTeamBadge', 'strForm', 'intPlayed', 'intRank', 'strTeam'].includes(field)
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 960px) {
  .fr-ranking-table {
    &.p-datatable.p-datatable-sm {
      .p-datatable-tbody {
        &>tr {
          &>td {
            padding: 0.5rem 3rem;
          }
        }
      }
    }
  }
}
</style>
