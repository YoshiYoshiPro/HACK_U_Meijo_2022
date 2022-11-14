<template>
  <div class="home">
    <h1>This is a home page</h1>
    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="名前" width="180"></el-table-column>
      <el-table-column prop="note" label="備考"></el-table-column>
    </el-table>
  </div>
</template>

<script>
const axios = require('axios').create()
export default {
  name: 'home',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.updataTableData()
  },
  methods: {
    updataTableData: async function () {
      const response = await axios.get('/api/spam')
      this.tableData = response.data
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 80%;
  margin: auto;
}
</style>