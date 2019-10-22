<template>
  <div class="container">
    <div v-show="!isTable">
      message
      標準報酬月額
      <el-input v-model.lazy.number="grossIncome.value"></el-input>
      6ヵ月定期代の1ヵ月相当額
      <el-input v-model.lazy.number="commuterPassCost.value"></el-input>
      <el-button type="primary" @click="toTable" :disabled="!grossIncome.validate || !commuterPassCost.validate">算出</el-button>
    </div>
    <div v-show="isTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="Date"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Address">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      grossIncome : {
        value : "",
        validate : false
      },
      commuterPassCost : {
        value : "",
        validate : false
      },
      isTable : false,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  watch : {
    "grossIncome.value" (val,old) {
      this.grossIncome.validate = this.moneyValidate(val, false)
    },
    "commuterPassCost.value" (val,old) {
      this.commuterPassCost.validate = this.moneyValidate(val, false)
    }
  },
  methods : {
    moneyValidate (val, isRelative) {
      return val !== "" && Number.isInteger(val) && (val >= 0 || isRelative)
    },
		toTable () {
			this.isTable = true
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
