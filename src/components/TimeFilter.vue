<template>
  <div class="time-selector">
    <i class="bi bi-clock" style="font-size: 1.5rem"></i>

    <span :class="{ active: 'Now' == selectedTimePeriod }" @click="setTime('Now')">Now</span>
    <span :class="{ active: 'in_3h' == selectedTimePeriod }" @click="setTime('in_3h')"
      >Last 3h</span
    >
    <span :class="{ active: 'in_18h' == selectedTimePeriod }" @click="setTime('in_18h')"
      >Last 18h</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'TimeFilter',
  props: {
    selectedTimePeriod: String
  },
  methods: {
    setTime(time: string) {
      this.$emit('setTime', time)
    }
  }
}
</script>
<style scoped>
.time-selector {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.time-selector span {
  cursor: pointer;
  background: var(--bs-secondary-bg);
  padding: 5px 15px;
  border-radius: 5px;
}
.time-selector span:hover {
  border-bottom: 2px solid green;
  background: green;
  color: #ffff;
}
.time-selector span.active {
  border-bottom: 2px solid green;
  background: green;
  color: #ffff;
}
</style>
