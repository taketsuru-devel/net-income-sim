export default {
  filters : {
    number_format (val) {
      return (new Intl.NumberFormat('ja-JP', { style: 'decimal' })).format(val);
    }
  },
}
