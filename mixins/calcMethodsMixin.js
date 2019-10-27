import insuranceMixin from "~/mixins/insuranceMixin.js"
import taxMixin from "~/mixins/taxMixin.js"
export default {
  mixins : [insuranceMixin,taxMixin],
  methods : {
    evalDiff (base, diff) {
      if (diff == "" || diff == null) {
        return parseInt(base)
      } else if (/^[\+\-]\d+$/.test(diff)) {
        return Math.max(parseInt(base) + parseInt(diff), 0)
      } else if (/^\d+$/.test(diff)) {
        return parseInt(diff)
      } else {
        return null
      }
    },
    calcAll (grossIncome, grossDiff, commuterPassCostPerSix, commuterDiff, age) {
      const gross = Math.min(this.evalDiff(grossIncome, grossDiff), 1000000)
      const commuterPassPerSix = Math.min(this.evalDiff(commuterPassCostPerSix, commuterDiff), 150000*6)
      if (gross === null || commuterPassPerSix === null) {
        return {}
      }
      let ret = {
        'grossIncome' : gross,
        'commuterPassCostPerSix' : commuterPassPerSix,
        'commuterPassCost' : Math.floor(commuterPassPerSix / 6),
      }
      //雇用保険、厚生保険、健康保険
      Object.assign(ret, this.calcInsurance(ret, false, age))

      //所得税、住民税
      Object.assign(ret, this.calcTax(ret))

      const baseCost = ret['grossIncome'] + ret['commuterPassCost']
      ret['netIncome'] = baseCost
                       - ret['employmentInsurance']
                       - ret['welfarePension']
                       - ret['healthInsurance']
                       - ret['incomeTax']
                       - ret['municipalTax']
      ret['netIncomeWithoutCom'] = ret['netIncome'] - ret['commuterPassCost']

      let companyCostInsurance = this.calcInsurance(ret, true, age)
      ret['companyCost'] = baseCost
                       + companyCostInsurance['employmentInsurance']
                       + companyCostInsurance['welfarePension']
                       + companyCostInsurance['healthInsurance']

      return ret
    }
  }
}
