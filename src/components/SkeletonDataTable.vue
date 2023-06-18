<template>
  <!--
    Datatable component - Available in Primevue library
  -->
  <DataTable :value="data">
    <Column v-for="col of tableColumns" :field="col.field" :header="col.header" :key="col.field">
      <template #body>
        <!--
          Skeleton component - Available in Primevue library
        -->
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
    /**
     * The columns that will be shown in the datatable.
     * @type [{header: '', field: ''}]
     */
    tableColumns: {
      type: Array,
      required: true
    }
  },
  methods: {
    /**
    * It generates an object composed by the properties/fields shown in the datatable.
    * Every field is assigned to an empty string.
    *
    */
    generateStaticRowData(){
      const newRow = {};
      for(let columnField of this.tableColumns){
        newRow[columnField] = '';
      }
      return newRow;
    },
    /**
    * It generates an array of objects.
    * It will be used by the datatable to show the initial 5 datatable skeleton rows.
    *
    */
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
