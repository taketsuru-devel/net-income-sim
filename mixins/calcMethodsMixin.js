import taxMixin from "~/mixins/taxMixin.js"
export default {
  mixins : [taxMixin],
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
    calcAll (grossIncome, grossDiff, commuterPassCost, commuterDiff) {
      const gross = this.evalDiff(grossIncome, grossDiff)
      const commuterPass = this.evalDiff(commuterPassCost, commuterDiff)
      if (gross === null || commuterPass === null) {
        return {}
      }
      let ret = {
        'grossIncome' : gross,
        'commuterPassCost' : commuterPass,
      }
      const baseCost = ret['grossIncome'] + ret['commuterPassCost']
      //https://jsite.mhlw.go.jp/tokyo-hellowork/content/contents/000403878.pdf
      //会社は4 / 1000
      ret['employmentInsurance'] = parseInt(baseCost * 3 / 1000)
      //https://www.nenkin.go.jp/service/kounen/hokenryo-gaku/gakuhyo/20170822.html
      //介護保険料後回し
      //折半して9.15% テーブルあるがまずはざっくり
      ret['welfarePension'] =  parseInt(baseCost * 0.00915)
      //https://www.its-kenpo.or.jp/documents/hoken/jimu/hokenryou/2018.3.1ryougaku.pdf
      //42.5 / 1000 折半
      //介護保険後回し
      ret['healthInsurance'] = parseInt(baseCost * 42.5 / 1000)

      //所得税、住民税
      Object.assign(ret, this.calcTax(ret))

      ret['netIncome'] = baseCost
                       - ret['employmentInsurance']
                       - ret['welfarePension']
                       - ret['healthInsurance']
                       - ret['incomeTax']
                       - ret['municipalTax']
      ret['netIncomeWithoutCom'] = ret['netIncome'] - ret['commuterPassCost']
      ret['companyCost'] = baseCost //会社支出 後で詰める

      return ret
    }
  }
}
