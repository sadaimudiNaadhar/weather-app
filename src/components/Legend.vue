<template>
  <div class="legend">
    <div class="color-code" :style="{ width: '15px', height: '15px', background: color }"></div>
    <span>
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LegendVue',
  props: ['color', 'text']
}
</script>

<style scoped>
.legend{
    display: flex;
    gap: 0.4rem;
    align-items: center;

}

.color-code{
    border: 1.5px solid;
}
</style>
