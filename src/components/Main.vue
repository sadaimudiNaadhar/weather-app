<script setup lang="ts">
import type { IWeatherApiResponse, MapCoordinates } from '@/types'
import { RoadConditionColorCode } from '@/types'
import DropDown from './DropDown.vue'
import axios from 'axios'
import Legend from './Legend.vue'

let options: object[] = [
  { value: '1', text: 'aa' + ' - ' + '1' },
  { value: '2', text: 'ab' + ' - ' + '2' },
  { value: '3', text: 'bc' + ' - ' + '3' },
  { value: '4', text: 'cd' + ' - ' + '4' },
  { value: '5', text: 'de' + ' - ' + '5' }
]
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#"><i class="bi bi-sunrise"></i> Weather Stats</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      
      <!-- Todo: Save dark mode data to local storage to persist dark mode -->
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          :onchange="toggleDarkMode"
          :checked="checkIfDarkMode()"
        />

        <label class="form-check-label text-end" for="flexSwitchCheckChecked">Dark Mode</label>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <div class="row">
      <!-- <v-select :options="options"></v-select> -->
      <div class="select-container">
        <DropDown
          @selected-weather-station="updateSelectedWeatherStation"
          :options="options"
          placeholder="Search Weather Station..."
        />
        <div class="search-btn-container">
          <button
            class="btn btn-outline-success ms-2"
            @click="submitSearch()"
            :disabled="!selectedWeatherStation"
          >
            <i class="bi bi-send"></i> Search
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="content-empty" v-if="apiData == null">
    <p><i class="bi bi-send"></i></p>
    <p>Search and select weather select station</p>
  </div>
  <div class="content container mt-4" v-else>
    <div class="row text-center">
      <div class="filter-selector-container mt-2">
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
      </div>
      <p class="card-text">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </p>
    </div>

    <div class="row mt-5">
      <div class="col-md-3">
        <div class="card">
          <div class="row">
            <div
              class="col-md-5"
              style="justify-content: center; display: flex; align-items: center"
            >
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
                <h1>18 °C</h1>
                <h2>Monday</h2>
                <h3>Nov 26</h3>
              </div>
            </div>
          </div>
        </div>

        <hr class="d-sm-none" />
      </div>
      <div class="col-md-9">
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

          <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                       A third list item
                       <span class="badge bg-primary rounded-pill">1</span>
                     </li>
                     <li class="list-group-item d-flex justify-content-between align-items-center">
                       A third list item
                       <span class="badge bg-primary rounded-pill">1</span>
                     </li> -->
        </ul>
      </div>
    </div>
    <div class="heading mt-3 mb-3">
      <h3><i class="bi bi-geo-alt"> </i></h3>
      <div>
        <div class="legend-container">
          <Legend
            v-for="legend in legends"
            :color="legend.color"
            :text="legend.text"
            :key="legend.text"
          />
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <div id="map" class="google-map"></div>

        <hr class="d-sm-none" />
      </div>
      <div class="col">
        <div id="map2" class="google-map"></div>
      </div>
    </div>
  </div>

  <footer class="mt-5 p-4 bg-dark text-white text-center bg-body-tertiary">
    <p>Footer</p>
  </footer>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
//import { Easing, Tween, update } from '@tweenjs/tween.js'
import { weatherApiResponse } from '@/MockResponse'
import type { RoadConditionData } from '@/types'

export default {
  components: {
    DropDown
  },
  data() {
    return {
      selectedTimePeriod: 'Now',
      selectedWeatherStation: '',
      apiData: null as any,
      //map
      google: null as any,
      map: null as any,
      roadData: [] as RoadConditionData[],
      roadMiddleCords: {} as MapCoordinates,
      legends: [
        {
          color: 'red',
          text: 'Heavy Snow'
        },
        {
          color: 'green',
          text: 'No Snow'
        },
        {
          color: 'blue',
          text: 'Medium Snow'
        },
        {
          color: '#ffff',
          text: 'White Snow'
        }
      ]
    }
  },
  async mounted() {
    this.google = new Loader({
      apiKey: 'AIzaSyCkwzRe-yWgV_OgIO6m-MD-R5sknRzMW3A',
      version: 'weekly'
    })

    await this.google.load()

    this.setTime(this.selectedTimePeriod)
    this.checkIfDarkMode()
    //await this.initializeMap(props);
  },
  computed: {},
  methods: {
    checkIfDarkMode() {
      const mode = document.documentElement.getAttribute('data-bs-theme')
      if (mode === 'dark') {
        return true
      }

      return false
    },
    toggleDarkMode() {
      if (this.checkIfDarkMode()) {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        return
      }
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    },
    updateSelectedWeatherStation(selectedWeatherStation: string) {
      this.selectedWeatherStation = selectedWeatherStation
    },
    setTime(period: string) {
      this.selectedTimePeriod = period // Update the selected item
    },
    getMedianCordinate(roadData: RoadConditionData[]) {
      roadData.sort((a, b) => a.lat - b.lat)
      const medianIndex = Math.floor(roadData.length / 2)
      let medianCoordinate

      if (roadData.length % 2 === 0) {
        const coordinate1 = roadData[medianIndex - 1]
        const coordinate2 = roadData[medianIndex]
        const medianLatitude = (coordinate1.lat + coordinate2.lat) / 2
        const medianLongitude = (coordinate1.lng + coordinate2.lng) / 2
        medianCoordinate = { lat: medianLatitude, lng: medianLongitude }
      } else {
        medianCoordinate = roadData[medianIndex]
      }

      return medianCoordinate
    },
    async submitSearch() {
      try {
        const selectedWeatherStation = this.selectedWeatherStation
        const response = await axios.post<IWeatherApiResponse>(
          'https://en3fqjhwcwvas.x.pipedream.net',
          {
            // Request payload or data
            // Replace with your actual data
            address: '123 Example St, City'
          }
        )

        response.data = weatherApiResponse as unknown as IWeatherApiResponse

        this.apiData = response.data

        // const { latitude, longitude } = response.data;
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        const mapData = response.data.weatherStationLocation as MapCoordinates

        this.roadData = response.data.roadData

        this.roadMiddleCords = this.getMedianCordinate(this.roadData) as MapCoordinates

        await this.initializeMap(mapData)
        await this.initializeMap2(this.roadMiddleCords, this.roadData)

        //this.$emit("show-map", response.data.weatherStationLocation as MapCoordinates);
      } catch (error) {
        console.error(error) // Handle any errors that occur during the request
      }
    },
    async initializeMap(mapCords: MapCoordinates) {
      const latLng = mapCords

      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
      const map = new Map(document.getElementById('map') as HTMLElement, {
        center: latLng,
        zoom: 8
      })

      // Add the circle for this city to the map.
      const cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map,
        center: latLng,
        radius: 100 * 100
      })

      const marker = new google.maps.Marker({
        position: latLng,
        map,
        title: this.selectedWeatherStation
      })

      cityCircle.setMap(map)
      marker.setMap(map)
    },
    async initializeMap2(mapCords: MapCoordinates, roadData: RoadConditionData[]) {
      const latLng = mapCords

      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
      const map = new Map(document.getElementById('map2') as HTMLElement, {
        center: latLng,
        zoom: 16,
        mapId: '15431d2b469f209e'
      })

      for (let i = 0; i < roadData.length - 1; i++) {
        let strokeColor = RoadConditionColorCode.OK

        if (roadData[i][this.selectedTimePeriod.toLowerCase()] == 0) {
          strokeColor = RoadConditionColorCode.OK
        }

        if (roadData[i][this.selectedTimePeriod.toLowerCase()] == 1) {
          strokeColor = RoadConditionColorCode.GOOD
        }

        if (roadData[i][this.selectedTimePeriod.toLowerCase()] == 2) {
          strokeColor = RoadConditionColorCode.BAD
        }

        const flightPath = new google.maps.Polyline({
          path: [
            { lat: roadData[i].lat, lng: roadData[i].lng },
            { lat: roadData[i + 1].lat, lng: roadData[i + 1].lng }
          ],
          geodesic: true,
          strokeColor: strokeColor,
          strokeOpacity: 5.0,
          strokeWeight: 5
        })

        flightPath.setMap(map)
      }
    }
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 400px;
}
.legend-container {
  display: flex;
  gap: 1.2rem;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading h3 {
  margin: 0;
  /* border-right: 2px solid #fff;
  padding-right: 0.5rem; */
}
</style>
