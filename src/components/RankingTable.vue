<template>
  <!--
    Datatable component - Available in Primevue library
  -->
  <DataTable removableSort :value="data" class="p-datatable-sm fr-ranking-table" :filters.sync="tableFilters">
    <Column :sortable="isSortingBtnShown(col.field)" v-for="col of tableColumns" :field="col.field" :header="col.header"
      :key="col.field">
      <!--
        Custom templates used for the team badges,
        the form field and to assign an id to the intRank field <span>
      -->
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
    /**
     * The data that will be shown in the datatable
     * @type [{
            "intRank": "1",
            "strTeam": "Manchester City",
            "strTeamBadge": "https:\/\/www.thesportsdb.com\/images\/media\/team\/badge\/vwpvry1467462651.png\/tiny",
            "strForm": "WLWLW",
            "intPlayed": "38",
            "intWin": "27",
            "intLoss": "6",
            "intDraw": "5",
            "intGoalsFor": "83",
            "intGoalsAgainst": "32",
            "intGoalDifference": "51",
            "intPoints": "86",
        }]
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * The columns that will be shown in the datatable
     * @type [{header: '', field: ''}]
     */
    tableColumns: {
      type: Array,
      required: true
    },
    /**
      * The filter used for filtering against the teams' names of the
      * datatable
      */
    tableFilter: {
      type: String,
      default: null
    },
  },
  methods: {
    /**
     * It determines whether to show the sorting buttons in the datatable
     *
     * @param {string} field
     */
    isSortingBtnShown (field) {
      return !['strTeamBadge', 'strForm', 'intPlayed', 'intRank', 'strTeam']
        .includes(field)
    }
  },
  watch: {
    /**
     * It updates the table filters, everytime the users changes the filter or
     * clicks on the "load more" button
     */
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
