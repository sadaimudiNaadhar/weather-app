<template>
  <ul class="list-group" v-if="apiData">
    <li class="list-group-item d-flex align-items-center">
      <span class="" style="height: 50px; width: 50px">
        <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" alt="" /> </span
      >&numsp; <span class="fs-6 fw-bold">Wind Speed:</span> &numsp;
      <span class="fs-6">{{
        Math.round(apiData.windSpeed?.[selectedTimePeriod.toLowerCase()])
      }}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
      <span class="" style="height: 50px; width: 50px">
        <img
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer.svg"
          alt=""
        /> </span
      >&numsp; <span class="fs-6 fw-bold">Temperature:</span> &numsp;
      <span class="fs-6">{{
        Math.round(apiData.temperature?.[selectedTimePeriod.toLowerCase()])
      }}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
      <span class="" style="height: 50px; width: 50px">
        <img
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer.svg"
          alt=""
        /> </span
      >&numsp; <span class="fs-6 fw-bold">Dew Temperature:</span> &numsp;
      <span class="fs-6">{{
        Math.round(apiData.tauTemperature?.[selectedTimePeriod.toLowerCase()])
      }}</span>
    </li>
    <li class="list-group-item d-flex align-items-center">
      <span class="" style="height: 50px; width: 50px">
        <img
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer.svg"
          alt=""
        /> </span
      >&numsp; <span class="fs-6 fw-bold">B-Temperature:</span> &numsp;
      <span class="fs-6">{{
        Math.round(apiData.bTemperature?.[selectedTimePeriod.toLowerCase()])
      }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'WeatherInfoDetail',
  props: ['apiData', 'selectedTimePeriod']
}
</script>
