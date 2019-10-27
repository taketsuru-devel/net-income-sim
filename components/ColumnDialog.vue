<template>
  <el-dialog :visible.sync="dialogVisible">
    <el-form ref="column" :model="column" :rules="rules">
      <el-form-item prop="name" label="項目名">
        <el-input placeholder="例) 定期券区間変更、引っ越し" v-model="column.name"></el-input>
      </el-form-item>
      <el-form-item prop="grossIncome" label="報酬変動額">
        <el-input placeholder="例) 200000:そのまま適応、+1000,-1000:差分を適応" v-model="column.grossIncome"></el-input>
      </el-form-item>
      <el-form-item prop="commuterPassCostPerSix" label="6ヶ月定期代変動額">
        <el-input placeholder="例) 200000:そのまま適応、+1000,-1000:差分を適応" v-model="column.commuterPassCostPerSix"></el-input>
      </el-form-item>
      <el-form-item prop="memo" label="メモ">
        <el-input placeholder="項目名で書ききれないことをここに" v-model="column.memo"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="save()">保存</el-button>
    <el-button @click="cancel()">キャンセル</el-button>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      idx : 0,
      column: {
        name : '',
        grossIncome : 0,
        commuterPassCostPerSix : 0,
        memo : ''
      },
      rules: {
        name:[
          { max:6, message: '6文字くらいでお願いします',trigger: 'blur'}
        ],
        grossIncome:[
          { pattern: /^[\+\-]?([1-9]\d*|0)$/, message: '数字を入力してください',trigger: 'blur'}
        ],
        commuterPassCostPerSix:[
          { pattern: /^[\+\-]?([1-9]\d*|0)$/, message: '数字を入力してください',trigger: 'blur'}
        ],
        memo:[
          { max:50, message: '50文字以内でお願いします',trigger: 'blur'}
        ],
      },
      dialogVisible: false,
    }
  },
  methods : {
    showDialog (column, idx) { //from parent
      this.idx = idx
      let self = this
      let getdata = Object.assign({}, column)
      Object.keys(getdata).forEach( (key) => {
        self.column[key] = getdata[key]
      })
      this.dialogVisible = true
    },
    save () {
      this.$refs.column.validate((valid) => {
        if (valid) {
          let pushdata = Object.assign({}, this.column)
          this.$emit('saveColumn', pushdata, this.idx)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    }
  }
}
</script>
