export default {
  methods : {
    evalDiff (base, diff) {
      if (diff == "" || diff == null) {
        return parseInt(base)
      } else if (/^[\+\-]\d+$/.test(diff)) {
        let ret = parseInt(base) + parseInt(diff)
        if (ret <= 0) ret = 0
        return ret
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
      //給与所得オンリー、累進、復興特別所得税、各種控除は後回し
      const incomeBase = (ret['grossIncome']*12) - 380000 //基礎控除
      ret['incomeTax'] = incomeBase * 0.2 / 12 //ざっくり
      //所得税での控除とは項目は同じだが額が微妙に違う
      ret['municipalTax'] = (ret['grossIncome']*12 -330000) * 0.2 / 12 //ざっくり

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
