export default {
  methods : {
    calcTax (costs) {
      return {
				incomeTax: this.calcIncomeTax(costs),
        municipalTax: this.calcMunicipalTax(costs),
			}
		},
		calcIncomeTax (costs) {
      //所得税
      /*
       * 利子所得（公債、社債、預貯金などの利子）：分配毎に完結
       * 配当所得（株式や出資の配当など）：損益通算を選択した場合
       * 不動産所得（地代、家賃、権利金など）
       * 事業所得（事業をしている場合に生じる所得）
       * 退職所得（退職金、一時恩給など）
       * 山林所得（山林を売った場合に生じる所得）
       * 譲渡所得（土地などの財産を売った場合に生じる所得）
       * 一時所得（クイズに当たった場合などに生じる所得）
       * 雑所得（公的年金等、原稿料など他の所得にあてはまらない所得）
      */
      //給与所得
      //額面
      let incomeBase = costs['grossIncome'] * 12

      //控除
      /*
       * 雑損控除
       * 医療費控除
       * 小規模企業共済等掛金控除(ideco)
       * 生命保険料控除
       * 地震保険料控除
       * 寄附金控除
       * 障害者控除
       * 寡婦(寡夫)控除(この控除は女性の場合と男性の場合とで要件に差があります。)
       * 勤労学生控除
       * 配偶者控除
       * 配偶者特別控除
       * 扶養控除
			*/
      //基礎控除
      let baseDeduction = 380000

      //社保控除
      let insuranceDeduction = (costs['employmentInsurance'] + costs['welfarePension'] + costs['healthInsurance']) * 12
      //給与支出控除
      //これは令和元年、毎年変わる可能性がある
      let salaryIncomeDeduction = 0
      if (incomeBase <= 1800000 ) {
        salaryIncomeDeduction = Math.max(incomeBase * 0.4, 650000)
      } else if (incomeBase <= 3600000 ) {
        salaryIncomeDeduction = incomeBase * 0.3 + 180000
      } else if (incomeBase <= 6600000 ) {
        salaryIncomeDeduction = incomeBase * 0.2 + 540000
      } else {
        salaryIncomeDeduction = 2200000
      }

      //課税対象
      let incomeTaxBase = Math.max((incomeBase
        - baseDeduction
        - insuranceDeduction
        - salaryIncomeDeduction), 0)

      //算出
      let incomeTax = 0
      if (incomeTaxBase <= 1950000 ) {
        incomeTax = incomeBase * 0.05
      } else if (incomeTaxBase <= 3300000 ) {
        incomeTax = incomeTaxBase * 0.1 + 97500
      } else if (incomeTaxBase <= 6950000 ) {
        incomeTax = incomeTaxBase * 0.2 + 427500
      } else if (incomeTaxBase <= 9000000 ) {
        incomeTax = incomeTaxBase * 0.23 + 636000
      } else if (incomeTaxBase <= 18000000 ) {
        incomeTax = incomeTaxBase * 0.33 + 1536000
      } else if (incomeTaxBase <= 40000000 ) {
        incomeTax = incomeTaxBase * 0.40 + 1536000
      } else {
        incomeTax = incomeBase * 0.45 - 4796000
      }
      return Math.floor(incomeTax / 12)
		},
		calcMunicipalTax (costs) {
			//住民税
      /*
       * 利子所得（公債、社債、預貯金などの利子）：分配毎に完結
       * 配当所得（株式や出資の配当など）：損益通算を選択した場合
       * 不動産所得（地代、家賃、権利金など）
       * 事業所得（事業をしている場合に生じる所得）
       * 退職所得（退職金、一時恩給など）
       * 山林所得（山林を売った場合に生じる所得）
       * 譲渡所得（土地などの財産を売った場合に生じる所得）
       * 一時所得（クイズに当たった場合などに生じる所得）
       * 雑所得（公的年金等、原稿料など他の所得にあてはまらない所得）
      */
      //給与所得
      //額面
      let incomeBase = costs['grossIncome'] * 12

      //控除
      /*
       * 雑損控除
       * 医療費控除
       * 小規模企業共済等掛金控除(ideco)
       * 生命保険料控除
       * 地震保険料控除
       * 寄附金控除
       * 障害者控除
       * 寡婦(寡夫)控除(この控除は女性の場合と男性の場合とで要件に差があります。)
       * 勤労学生控除
       * 配偶者控除
       * 配偶者特別控除
       * 扶養控除
			*/
      //基礎控除
      let baseDeduction = 330000

      //社保控除
      let insuranceDeduction = (costs['employmentInsurance'] + costs['welfarePension'] + costs['healthInsurance']) * 12
      //給与支出控除
      //これは令和元年(自治体で変わる？)、毎年変わる可能性がある
      let salaryIncomeDeduction = 0
      if (incomeBase <= 1625000 ) {
        salaryIncomeDeduction = 650000
      } else if (incomeBase <= 1800000 ) {
        salaryIncomeDeduction = incomeBase * 0.4
      } else if (incomeBase <= 3600000 ) {
        salaryIncomeDeduction = incomeBase * 0.3 + 180000
      } else if (incomeBase <= 6600000 ) {
        salaryIncomeDeduction = incomeBase * 0.2 + 540000
      } else if (incomeBase <= 10000000 ) {
        salaryIncomeDeduction = incomeBase * 0.1 + 1200000
      } else {
        salaryIncomeDeduction = 2200000
      }
      //特定支出控除(勤務上の経費系)
			//給与所得控除の50%以上の額からなのでまず関係ない

      //課税対象
      let municipalTaxBase = Math.max((incomeBase
        - baseDeduction
        - insuranceDeduction
        - salaryIncomeDeduction), 0)

      //算出
      let municipalTaxCity = Math.floor((municipalTaxBase * 0.08 + 4400) / 12)
      let municipalTaxPref = Math.floor((municipalTaxBase * 0.02025 + 1800) / 12)

      return municipalTaxCity + municipalTaxPref
    }
  }
}
