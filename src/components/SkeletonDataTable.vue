<template>
  <DataTable :value="data">
    <Column v-for="col of tableColumns" :field="col.field" :header="col.header" :key="col.field">
      <template #body>
        <Skeleton />
      </template>
    </Column>
  </DataTable>
</template>
<script>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Skeleton from 'primevue/skeleton';
export default {
  name: 'RankingTable',
  components: {
    Skeleton,
    DataTable,
    Column,
  },
  data () {
    return {
      staticRowData: this.generateStaticRowData(),
      data: this.generateStaticDataTableData()
    }
  },
  props: {
    tableColumns: {
      type: Array,
      required: true
    }
  },
  methods: {
    generateStaticRowData(){
      const newRow = {};
      for(let columnField of this.tableColumns){
        newRow[columnField] = '';
      }
      return newRow;
    },
    generateStaticDataTableData () {
      let i = 0;
      const newData = [];
      while (i <= 5) {
        newData.push(this.staticRowData);
        i++;
      }
      return newData;
    }
  },
}
</script>
