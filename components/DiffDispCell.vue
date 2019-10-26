<template>
  <div>
    <p class="num">
      {{ after | number_format }}
    </p>
    <p class="num" v-if="typeof(base) !== 'undefined'">
      <small class="blue">{{ after - base | number_format }}</small>
    </p>
  </div>
</template>

<script>
import formatFilterMixin from '~/mixins/formatFilterMixin.js'
export default {
  props : [
    'base',
    'after',
  ],
  mixins : [formatFilterMixin],
}
</script>

<style>
.num {
  text-align : right;
}
.blue {
  color : #0000CD;
}
</style>
