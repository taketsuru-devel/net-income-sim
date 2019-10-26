<template>
  <div>
    <p class="num">
      {{ after | number_format }}
    </p>
    <p class="num" v-if="typeof(base) !== 'undefined'">
      <small :class="color">{{ after - base | number_format }}</small>
    </p>
  </div>
</template>

<script>
import formatFilterMixin from '~/mixins/formatFilterMixin.js'
export default {
  props : [
    'base',
    'after',
    'positiveTrue',
  ],
  mixins : [formatFilterMixin],
  computed : {
    color () {
      let diffsign = (this.after - this.base) >= 0
      return (diffsign && this.positiveTrue) || (!diffsign && !this.positiveTrue) ? "green" : "red"
    }
  }
}
</script>

<style>
.num {
  text-align : right;
}
.red {
  color : #FF0000;
}
.green {
  color : #00FF00;
}
</style>
