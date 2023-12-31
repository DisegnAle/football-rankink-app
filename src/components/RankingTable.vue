<template>
  <!--
    Datatable component - Available in Primevue library
  -->
  <DataTable removableSort stripedRows :value="data" class="p-datatable-sm fr-ranking-table" :filters.sync="tableFilters">
    <Column :sortable="isSortingBtnShown(col.field)" v-for="col of tableColumns" :field="col.field" :key="col.field"
      :header="col.header">

      <!--
        Custom templates used for
        showing a tooltip on header fields hover
      -->
      <template #header>
        <div class="fr-ranking-table__p-custom-title" v-tooltip.bottom="{ value: col.extendedHeader}">{{ col.header }}</div>
      </template>

      <!--
        Custom templates used for
        the team badges,
        the form field
        the intRank field
      -->
      <template #body="bodySlotProps">
        <!--
          Image crest with alt attribute
        -->
        <div v-if="col.field === 'strTeamBadge'">
          <img :src="bodySlotProps.data.strTeamBadge" :alt="`${bodySlotProps.data.strTeam} crest`" />
        </div>
        <!--
          Custom form icon component
        -->
        <div v-else-if="col.field === 'strForm'">
          <form-icon v-for="(icon, index) in bodySlotProps.data.strForm.split('')" :key="`${icon}-${index}`"
            :form-type="icon">
          </form-icon>
        </div>
        <!--
          IntRank field
        -->
        <span v-else-if="col.field === 'intRank'" :id="`row-${bodySlotProps.data.intRank}`" class="p-field-property">
          {{ bodySlotProps.data[col.field] }}
        </span>
        <span v-else :class="{'p-field-property__strTeam': col.field === 'strTeam'}">
          {{ bodySlotProps.data[col.field] }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { FilterMatchMode } from 'primevue/api/';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Tooltip from 'primevue/tooltip';
import FormIcon from './FormIcon.vue';
export default {
  name: 'RankingTable',
  components: {
    DataTable,
    Column,
    FormIcon
  },
  directives: {
    'tooltip': Tooltip
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
     * @type [{header: '', extendedHeader: '', field: ''}]
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
     * It updates the table filter value (everytime the users changes the filter or
     * clicks on the "load more" button)
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

    &.p-datatable .p-datatable-tbody>tr {
      td:first-child {
        padding-top: 2em;
        padding-bottom: 1em;

        .p-field-property {
          border: 1px solid;
          border-radius: 50%;
          padding: 0.4em;
          text-align: center;
          width: 34px;
          height: 34px;
        }
      }
    }

    &__p-custom-title {
      display: none;
    }

    .p-field-property__strTeam {
      color: var(--primary-color);
      font-weight: 600;
    }
  }
}

@media screen and (min-width: 961px) {
  .fr-ranking-table {
    &.p-datatable .p-datatable-thead>tr>th {
      .p-column-title {
        display: none;
      }
    }
  }
}

.p-tooltip {
  position: absolute;
}
</style>
