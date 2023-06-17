<template>
  <DataTable :value="data">
    <Column v-for="col of tableColumns" :field="col.field" :header="col.header" :key="col.field">
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
      default:  () => []
    },
    tableColumns: {
      type: Array,
      required: true
    }
  }
}
</script>
