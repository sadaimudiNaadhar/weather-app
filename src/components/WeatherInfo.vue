<template>
  <div class="card">
    <div class="row">
      <div class="col-md-5" style="justify-content: center; display: flex; align-items: center">
        <img
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
          alt="clear-day"
          loading="lazy"
          class="opNLj"
        />
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title">Sunny Day</h5>
          <h1>{{temperature || "18 °C"}}</h1>
          <h2>Monday</h2>
          <h3>Nov 26</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeatherInfo',
  props:{
    temperature: String,

  }
}
</script>
