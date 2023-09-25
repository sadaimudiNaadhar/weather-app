<template>
  <ul class="list-group" v-if="apiData">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Wind Speed:
      {{ Math.round(apiData.windSpeed?.[selectedTimePeriod.toLowerCase()]) }}
      <span class="" style="height: 50px; width: 50px"
        ><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" alt=""
      /></span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Temperature Speed:
      {{ Math.round(apiData.temperature?.[selectedTimePeriod.toLowerCase()]) }}
      <span class="" style="height: 50px; width: 50px"
        ><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg" alt=""
      /></span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Temperature Speed:
      {{ Math.round(apiData.temperature?.[selectedTimePeriod.toLowerCase()]) }}
      <span class="" style="height: 50px; width: 50px"
        ><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg" alt=""
      /></span>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'WeatherInfoDetail',
  props:[
    "apiData",
    "selectedTimePeriod"
  ]
}
</script>
