<template>
  <div class="container">
    <div v-if="!isTable">
      <p class="title">弊社が移転して定期代が変わると<br>手取りにどれだけ影響があるか算出できるフォーム</p>
      <init-form :grossIncome="grossIncome" :commuterPassCostPerSix="commuterPassCostPerSix" :age="age" @submitdata="showTable"/>
    </div>
    <div v-else>
      <value-table :grossIncome="grossIncome" :commuterPassCostPerSix="commuterPassCostPerSix" :age="age" @showform="showForm"/>
    </div>
  </div>
</template>

<script>
import InitForm from '~/components/InitForm.vue'
import ValueTable from '~/components/ValueTable.vue'

export default {
  components : {
    InitForm, ValueTable
  },
  data () {
    return {
      grossIncome: 0,
      commuterPassCostPerSix: 0,
      age : 30,
      isTable : false,
    }
  },
  methods : {
		showForm () {
			this.isTable = false
    },
		showTable (initData) {
      this.grossIncome = initData.grossIncome
      this.commuterPassCostPerSix = initData.commuterPassCostPerSix
      this.age = initData.age
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
  font-size: 20px;
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
