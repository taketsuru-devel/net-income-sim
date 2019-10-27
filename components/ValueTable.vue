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
        <template slot-scope="scope">
          {{scope.row.group}}
          <el-button icon="el-icon-search" v-if="scope.$index == 3" @click="showNotice"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="項目"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.type }}
          <template v-if="scope.$index == 6">
            <el-popover title="給与明細の値と異なります" content="所得税天引き額は350行くらいある表から算出されます。本フォームでは計算が楽な方な年末調整後の額となります。" placement="top-start" trigger="hover">
              <el-badge value="注" slot="reference"/>
            </el-popover>
          </template>
          <template v-if="scope.$index == 7">
            <el-popover title="ほとんどの場合、給与明細の値と異なります" content="住民税天引き額は前年度の所得から計算されます。本フォームでは来年度の参考額となります。" placement="top-start" trigger="hover">
              <el-badge value="注" slot="reference"/>
            </el-popover>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="value0"
        label="現状"
        width="100">
        <template slot="header" slot-scope="scope">
          {{scope.column.label}}
          <el-button type="primary" icon="el-icon-edit" circle @click="showForm"/>
        </template>
        <template slot-scope="scope">
          <diff-disp-cell :after="scope.row.value0"/>
        </template>
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
          <diff-disp-cell :base="tableData[scope.$index].value0" :after="scope.row.value1"/>
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
          <diff-disp-cell :base="tableData[scope.$index].value0" :after="scope.row.value2"/>
        </template>
      </el-table-column>
    </el-table>
    <ColumnDialog ref="ColumnDialog" @saveColumn="saveColumn"/>
    <Notice :isNoticeVisible="isShowNotice" @closeNotice="closeNotice"/>
  </div>
</template>

<script>
import calcMethodsMixin from '~/mixins/calcMethodsMixin.js'
import ColumnDialog from '~/components/ColumnDialog.vue'
import DiffDispCell from '~/components/DiffDispCell.vue'
import Notice from '~/components/Notice.vue'
export default {
  components : {ColumnDialog, DiffDispCell, Notice},
  mixins: [calcMethodsMixin],
  props : [
    'age',
    'grossIncome',
    'commuterPassCostPerSix',
  ],
  data () {
    return {
      tableKeys : [
        'grossIncome',            //月額報酬
        'commuterPassCostPerSix', //交通費(6ヶ月)
        'commuterPassCost',       //交通費
        'employmentInsurance',    //雇用保険
        'welfarePension',         //厚生年金
        'healthInsurance',        //健康保険
        'incomeTax',              //所得税
        'municipalTax',           //住民税
        'netIncome',              //手取り
        'netIncomeWithoutCom',    //手取り(交通費除外)
        'companyCost'             //会社支出
      ],
      columnData : [
        {name : 'カスタム1', grossIncome:'', commuterPassCostPerSix:'', memo:'', _column:'value1'},
        {name : 'カスタム2', grossIncome:'', commuterPassCostPerSix:'', memo:'', _column:'value2'},
      ],
      tableData: [
        {
          key: 'grossIncome',
          group: '額面',
          type: '標準月額報酬',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'commuterPassCostPerSix',
          group: '額面',
          type: '6ヵ月定期代',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'commuterPassCost',
          group: '額面',
          type: '定期代1ヵ月分',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'employmentInsurance',
          group: '天引き',
          type: '雇用保険',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'welfarePension',
          group: '天引き',
          type: '厚生年金',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'healthInsurance',
          group: '天引き',
          type: '健康保険',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'incomeTax',
          group: '天引き',
          type: '所得税',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'municipalTax',
          group: '天引き',
          type: '住民税',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'netIncome',
          group: '手取り',
          type: '',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'netIncomeWithoutCom',
          group: '手取り(交通費除外)',
          type: '',
          value0: '',
          value1: '',
          value2: '',
        },
        {
          key: 'companyCost',
          group: '会社支出',
          type: '',
          value0: '',
          value1: '',
          value2: '',
        },
      ],
      isShowNotice: false,
    }
  },
  methods : {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //決め打ち
      if (columnIndex === 0) {
        if (rowIndex  == 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (rowIndex == 3) {
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
      this.tableData.forEach((column) => {
        column[dest] = current[column.key]
      })
    },
    showNotice () {
      this.isShowNotice = true
    },
    closeNotice () {
      this.isShowNotice = false
    },
    showForm () {
      this.$emit('showform')
    },
    editColumn (idx) {
      this.$refs.ColumnDialog.showDialog(this.columnData[idx], idx)
    },
    saveColumn (column, idx) { //from child
      this.columnData[idx]['name'] = column.name
      this.columnData[idx]['grossIncome'] = column.grossIncome
      this.columnData[idx]['commuterPassCostPerSix'] = column.commuterPassCostPerSix
      this.columnData[idx]['memo'] = column.memo
      this.updateColumn(this.grossIncome, this.columnData[idx]['grossIncome'], this.commuterPassCostPerSix, this.columnData[idx]['commuterPassCostPerSix'], this.columnData[idx]['_column'])
    },
  },
  mounted () {
    this.updateColumn(this.grossIncome, null, this.commuterPassCostPerSix, null, 'value0')
    this.updateColumn(this.grossIncome, null, this.commuterPassCostPerSix, null, 'value1')
    this.updateColumn(this.grossIncome, null, this.commuterPassCostPerSix, null, 'value2')
  }
}
</script>
