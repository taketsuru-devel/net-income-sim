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
      //標準報酬月額算出基準上側
      let tableUpper = [
        93000, 101000,107000,114000,122000,130000,138000,146000,155000,165000,176000,185000,195000,210000,230000,250000,270000,290000,310000,330000,350000,370000,395000,425000,455000,485000,515000,545000,575000,605000
      ]
      //標準報酬月額
      let tableValue = [
        88000, 98000,147000,110000,118000,126000,134000,142000,150000,160000,170000,180000,190000,200000,220000,240000,260000,280000,300000,320000,340000,360000,380000,410000,440000,470000,500000,530000,560000,590000
      ]
      let i;
      for(i=0; i < tableUpper.length; i++) {
        if (baseCost <= tableUpper[i]) {
          baseCost = tableValue[i]
          break;
        }
      }
      if (i >= tableUpper.length) {
        baseCost = 620000
      }
      let ret = Math.floor(baseCost * 0.0915)
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
      //標準報酬月額算出基準上側
      let tableUpper = [
        63000, 73000, 83000, 93000, 101000,107000,114000,122000,130000,138000,146000,155000,165000,176000,185000,195000,210000,230000,250000,270000,290000,310000,330000,350000,370000,395000,425000,455000,485000,515000,545000,575000,605000,635000,665000,695000,730000,770000,810000,855000,905000,955000,1005000,1055000,1115000,1175000,1235000,1295000,1355000
      ]
      //標準報酬月額
      let tableValue = [
        58000, 68000, 78000, 88000, 98000,147000,110000,118000,126000,134000,142000,150000,160000,170000,180000,190000,200000,220000,240000,260000,280000,300000,320000,340000,360000,380000,410000,440000,470000,500000,530000,560000,590000,620000,650000,680000,710000,750000,790000,830000,880000,930000,980000,1030000,109000,1150000,1210000,1270000,1330000
      ]
      let i;
      for(i=0; i < tableUpper.length; i++) {
        if (baseCost <= tableUpper[i]) {
          baseCost = tableValue[i]
          break;
        }
      }
      if (i >= tableUpper.length) {
        baseCost = 1390000
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
