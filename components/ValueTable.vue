<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      style="width: 100%">
      <el-table-column
        prop="group"
        label="分類"
        width="80">
      </el-table-column>
      <el-table-column
        prop="type"
        label="項目"
        width="120">
      </el-table-column>
      <el-table-column
        prop="value0"
        label="現状"
        width="120">
      </el-table-column>
      <el-table-column
        prop="value1"
        :label="columnData[0].name"
        width="140">
        <template slot="header" slot-scope="scope">
          {{scope.column.label}}
          <el-button type="primary" icon="el-icon-edit" circle @click="editColumn(0)"/>
        </template>
        <template slot-scope="scope">
          <el-input v-if="scope.$index <= -1" v-model.lazy="scope.row.value1"/>
          <template v-else>{{ scope.row.value1 }}</template>
        </template>
      </el-table-column>
      <el-table-column
        prop="value2"
        :label="columnData[1].name"
        width="140">
        <template slot="header" slot-scope="scope">
          {{scope.column.label}}
          <el-button type="primary" icon="el-icon-edit" circle @click="editColumn(1)"/>
        </template>
        <template slot-scope="scope">
          <el-input v-if="scope.$index <= -1" v-model.lazy="scope.row.value2"/>
          <template v-else>{{ scope.row.value2 }}</template>
        </template>
      </el-table-column>
    </el-table>
    <ColumnDialog ref="ColumnDialog" @saveColumn="saveColumn"/>
  </div>
</template>

<script>
import calcMethodsMixin from '~/mixins/calcMethodsMixin.js'
import ColumnDialog from '~/components/ColumnDialog.vue'
export default {
  components : {ColumnDialog},
  mixins: [calcMethodsMixin],
  props : [
    'age',
    'grossIncomeValue',
    'commuterPassCostValue',
  ],
  data () {
    return {
      tableKeys : [
        'grossIncome',         //月額報酬
        'commuterPassCost',    //交通費
        'employmentInsurance', //雇用保険
        'welfarePension',      //厚生年金
        'healthInsurance',     //健康保険
        'incomeTax',           //所得税
        'municipalTax',        //住民税
        'netIncome',           //手取り
        'netIncomeWithoutCom', //手取り(交通費除外)
        'companyCost' //会社支出
      ],
      columnData : [
        {name : 'カスタム1', grossIncome:0, commuterPassCost:0, memo:'', _column:'value1'},
        {name : 'カスタム2', grossIncome:0, commuterPassCost:0, memo:'', _column:'value2'},
      ],
      tableData: [
        {
          key: 'grossIncome',
          group: '額面',
          type: '標準月額報酬',
          value0: '100',
          value1: '200',
          value2: '300',
        },
        {
          key: 'commuterPassCost',
          group: '額面',
          type: '1ヵ月交通費',
          value0: '10',
          value1: '20',
          value2: '30',
        },
        {
          key: 'employmentInsurance',
          group: '天引き',
          type: '雇用保険',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'welfarePension',
          group: '天引き',
          type: '厚生年金',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'healthInsurance',
          group: '天引き',
          type: '健康保険',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'incomeTax',
          group: '天引き',
          type: '所得税',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'municipalTax',
          group: '天引き',
          type: '住民税',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'netIncome',
          group: '手取り',
          type: '',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'netIncomeWithoutCom',
          group: '手取り(交通費除外)',
          type: '',
          value0: '1',
          value1: '2',
          value2: '3',
        },
        {
          key: 'companyCost',
          group: '会社支出',
          type: '',
          value0: '1',
          value1: '2',
          value2: '3',
        },
      ]
    }
  },
  methods : {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //決め打ち
      if (columnIndex === 0) {
        if (rowIndex  == 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex == 2) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (row.type == "") {
          return {
            rowspan: 1,
            colspan: 2
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (columnIndex === 1 && row.type == "") {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
    updateColumn (gross, gdiff, commuterPass, cdiff, dest) {
      const current = this.calcAll(gross, gdiff, commuterPass, cdiff, this.age)
      console.log(current)
      this.tableData.forEach((column) => {
        column[dest] = current[column.key]
      })
    },
    editColumn (idx) {
      this.$refs.ColumnDialog.showDialog(this.columnData[idx], idx)
    },
    saveColumn (column, idx) { //from child
      this.columnData[idx]['name'] = column.name
      this.columnData[idx]['grossIncome'] = column.grossIncome
      this.columnData[idx]['commuterPassCost'] = column.commuterPassCost
      this.columnData[idx]['memo'] = column.memo
      this.updateColumn(this.grossIncomeValue, this.columnData[idx]['grossIncome'], this.commuterPassCostValue, this.columnData[idx]['commuterPassCost'], this.columnData[idx]['_column'])
    }
  },
  mounted () {
    this.updateColumn(this.grossIncomeValue, null, this.commuterPassCostValue, null, 'value0')
    this.updateColumn(this.grossIncomeValue, null, this.commuterPassCostValue, null, 'value1')
    this.updateColumn(this.grossIncomeValue, null, this.commuterPassCostValue, null, 'value2')
  }
}
</script>
