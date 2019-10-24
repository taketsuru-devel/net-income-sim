export default {
  methods : {
    calcInsurance (costs, IsCompany, age) {
      return {
				employmentInsurance: this.calcEmploymentInsurance(costs, IsCompany),
        welfarePension: this.calcWelfarePension(costs, IsCompany),
        healthInsurance: this.calcHealthInsurance(costs, age),
			}
		},
		calcEmploymentInsurance (costs, IsCompany) {
      //https://jsite.mhlw.go.jp/tokyo-hellowork/content/contents/000403878.pdf
      const baseCost = costs['grossIncome'] + costs['commuterPassCost']
      if (IsCompany) {
        //会社は6 / 1000、毎年変わるかも
        return Math.floor(baseCost * 6 / 1000)
      } else {
        return Math.floor(baseCost * 3 / 1000)
      }
    },
		calcWelfarePension (costs, IsCompany) {
      //https://www.nenkin.go.jp/service/kounen/hokenryo-gaku/gakuhyo/20170822.html
      //折半してそれぞれ9.15%
      let baseCost = costs['grossIncome'] + costs['commuterPassCost']
      let table = [
        93000, 101000,107000,114000,122000,130000,138000,146000,155000,165000,176000,185000,195000,210000,230000,250000,270000,290000,310000,330000,350000,370000,395000,425000,455000,485000,515000,545000,575000,605000
      ]
      let i;
      for(i=0; i < table.length; i++) {
        if (baseCost <= table[i]) break;
      }
      if (i == 0) {
        baseCost = 88000
      } else if (i >= table.length) {
        baseCost = 620000
      } else {
        baseCost = (table[i-1] + table[i]) / 2
      }
      let ret = Math.floor(baseCost * 0.00915)
      if (IsCompany) {
        //事業主のみ
        //子ども・子育て拠出金率 0.34%
        ret += Math.floor(baseCost * 0.0034)
      }
      return ret
    },
		calcHealthInsurance (costs, age) {
      //https://www.its-kenpo.or.jp/documents/hoken/jimu/hokenryou/2018.3.1ryougaku.pdf
      //81 / 1000 折半
      let baseCost = costs['grossIncome'] + costs['commuterPassCost']
      let table = [
        63000, 73000, 83000, 93000, 101000,107000,114000,122000,130000,138000,146000,155000,165000,176000,185000,195000,210000,230000,250000,270000,290000,310000,330000,350000,370000,395000,425000,455000,485000,515000,545000,575000,605000,635000,665000,695000,730000,770000,810000,855000,905000,955000,1005000,1055000,1115000,1175000,1235000,1295000,1355000
      ]
      let i;
      for(i=0; i < table.length; i++) {
        if (baseCost <= table[i]) break;
      }
      if (i == 0) {
        baseCost = 58000
      } else if (i >= table.length) {
        baseCost = 1390000
      } else {
        baseCost = (table[i-1] + table[i]) / 2
      }
      let ret = Math.floor(baseCost * 42.5 / 1000)
      if (age >= 40) {
        //介護保険
        //16 / 1000 折半
        ret += Math.floor(baseCost * 8 / 1000)
      }
      return ret
    }
  }
}
