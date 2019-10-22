<template>
  <div class="container">
    <div v-show="!isTable">
      message
      標準報酬月額
      <el-input v-model.lazy.number="grossIncome.value"></el-input>
      6ヵ月定期代の1ヵ月相当額
      <el-input v-model.lazy.number="commuterPassCost.value"></el-input>
      <el-button type="primary" @click="toTable" :disabled="!validateOk">算出</el-button>
    </div>
    <div v-show="isTable">
      <el-button type="primary" @click="toForm">戻る</el-button>
      <value-table :grossIncomeValue="grossIncome.value" :commuterPassCostValue="commuterPassCost.value"/>
    </div>
  </div>
</template>

<script>
import ValueTable from '~/components/ValueTable.vue'

export default {
  components : {
    ValueTable
  },
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
  computed : {
    validateOk () {
      return this.grossIncome.validate && this.commuterPassCost.validate
    }
  },
  methods : {
    moneyValidate (val, isRelative) {
      return val !== "" && Number.isInteger(val) && (val >= 0 || isRelative)
    },
		toForm () {
			this.isTable = false
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
