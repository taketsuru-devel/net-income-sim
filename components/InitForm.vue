<template>
  <el-form ref="initData" :model="initData" :rules="rules">
    <el-form-item label="標準報酬月額" prop="grossIncome">
      <el-input v-model.lazy.number="initData.grossIncome"/>
    </el-form-item>
    <el-form-item label="6ヵ月定期代" prop="commuterPassCostPerSix">
      <el-input v-model.lazy.number="initData.commuterPassCostPerSix"/>
    </el-form-item>
    <el-form-item label="年齢" prop="age">
      <el-input v-model.lazy.number="initData.age"/>
    </el-form-item>
    <el-button type="primary" @click="submitForm">算出</el-button>
  </el-form>
</template>

<script>
export default {
  props : ['grossIncome', 'commuterPassCostPerSix', 'age'],
  data () {
    return {
      initData: {
        grossIncome : 0,
        commuterPassCostPerSix : 0,
        age : 30,
      },
      rules: {
        age:[
          { type: 'integer', message: "弊社社員は26～55歳くらいのはず", min:26, max:55, required: true}
        ],
        grossIncome:[
          { type: 'integer', message: "現実味のない値を入れないでください", min:50000, max:1000000, required:true, trigger: 'submit'}
        ],
        commuterPassCostPerSix:[
          { type: 'integer', message: "90万までの正の数です", min:0, max:150000*6, required:true, trigger: 'submit'}
        ],
      },
    }
  },
  methods: {
    submitForm () {
      this.$refs.initData.validate((valid) => {
        if (valid) {
          this.$emit('submitdata', Object.assign({}, this.initData))
          return true
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.initData.grossIncome = this.grossIncome
    this.initData.commuterPassCostPerSix = this.commuterPassCostPerSix
    this.initData.age = this.age
  }
}
</script>
