<template>
  <div class="card ">

    <!-- <div class="col-md-5" style="justify-content: center; display: flex; align-items: center">
        <img
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
          alt="clear-day"
          loading="lazy"
          class="opNLj"
        />
      </div> -->

    <div class="card-body d-flex flex-column align-items-center justify-content-center ">
      <!-- <h5 class="card-title">Sunny Day</h5>
          <h1>{{temperature || "18 °C"}}</h1> -->
      <h2>{{ formattedDate }}</h2>
      <br>
      <h3>{{ formattedTime }}</h3>
    </div>


  </div>
</template>

<script lang="ts">
export default {
  name: 'WeatherInfo',
  props: {
    temperature: String,

  },
  data() {
    return {
      formattedDate: '',
      formattedTime: ''
    };
  },
  mounted() {
    this.getCurrentDateTime();
    // Refresh the date and time every second
    setInterval(this.getCurrentDateTime, 1000);
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();

      // Format the date
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      this.formattedDate = now.toLocaleDateString('en-US', options);

      // Format the time in 24-hour format without seconds
      const timeOptions = { hour: 'numeric', minute: 'numeric' };
      this.formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    }
  }
}
</script>