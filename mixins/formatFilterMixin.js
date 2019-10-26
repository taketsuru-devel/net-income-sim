export default {
  filters : {
    number_format (val) {
      let fmt = (new Intl.NumberFormat('ja-JP', { style: 'decimal' })).format(val);
      return fmt.replace('-',"▲")
    }
  }
}
