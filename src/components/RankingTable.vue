<template>
  <DataTable removableSort :value="data" class="p-datatable-sm fr-ranking-table" :filters.sync="tableFilters">
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
import { FilterMatchMode } from 'primevue/api/';
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
      tableFilters: {
        'strTeam': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      required: true
    },
    tableFilter: {
      type: String,
      default: null
    },
  },
  methods: {
    isSortingBtnShown (field) {
      return !['strTeamBadge', 'strForm', 'intPlayed', 'intRank', 'strTeam'].includes(field)
    }
  },
  watch: {
    tableFilter: function (newVal) {
      this.tableFilters['strTeam'].value = newVal;
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
