<script setup lang="ts">
import type { IWeatherApiResponse, MapCoordinates } from '@/types'
import { RoadConditionColorCode } from '@/types'
import DropDown from './DropDown.vue'
import axios from 'axios'

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
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Weather Stats</a>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <DropDown
          @selected-weather-station="updateSelectedWeatherStation"
          :options="options"
          placeholder="Search Weather Station..."
        />
        <button class="btn btn-outline-success ms-2" @click="submitSearch()">Search</button>
        <div>
          <button class="btn-time-period btn btn-primary ms-2" @click="setTime('Now')">Now</button>
          <button class="btn-time-period btn btn-primary ms-2" @click="setTime('in_3h')">3h</button>
          <button class="btn-time-period btn btn-primary ms-2" @click="setTime('in_18h')">
            18h
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
                alt="clear-day"
                loading="lazy"
                class="opNLj"
              />
              <h1>18 °C</h1>
              <h2>Monday</h2>
              <h3>Nov 26</h3>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Sunny Day</h5>

                <ul class="list-group" v-if="apiData">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Wind Speed:
                    {{ Math.round(apiData.windSpeed?.[selectedTimePeriod.toLowerCase()]) }}
                    <span class="" style="height: 50px; width: 50px"
                      ><img
                        src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg"
                        alt=""
                    /></span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Temperature Speed:
                    {{ Math.round(apiData.temperature?.[selectedTimePeriod.toLowerCase()]) }}
                    <span class="" style="height: 50px; width: 50px"
                      ><img
                        src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
                        alt=""
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

                <p class="card-text">
                  <small class="text-body-secondary">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr class="d-sm-none" />
      </div>
      <div class="col-md-6">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card mb-3" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
                    alt="clear-day"
                    loading="lazy"
                    class="opNLj"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mb-3" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
                    alt="clear-day"
                    loading="lazy"
                    class="opNLj"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mb-3" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg"
                    alt="clear-day"
                    loading="lazy"
                    class="opNLj"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div id="map" class="google-map"></div>

        <hr class="d-sm-none" />
      </div>
      <div class="col-md-6">
        <div id="map2" class="google-map"></div>
      </div>
    </div>
  </div>

  <div class="mt-5 p-4 bg-dark text-white text-center">
    <p>Footer</p>
  </div>
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
      roadMiddleCords: {} as MapCoordinates
    }
  },
  async mounted() {
    this.google = new Loader({
      apiKey: 'AIzaSyCkwzRe-yWgV_OgIO6m-MD-R5sknRzMW3A',
      version: 'weekly'
    })

    await this.google.load()

    this.setTime(this.selectedTimePeriod)
    //await this.initializeMap(props);
  },
  computed: {},
  methods: {
    updateSelectedWeatherStation(selectedWeatherStation: string) {
      this.selectedWeatherStation = selectedWeatherStation
    },
    setTime(period: string) {
      this.selectedTimePeriod = period // Update the selected item

      // Loop through all the buttons and assign appropriate classes
      const buttons = document.querySelectorAll('.btn-time-period')
      buttons.forEach((button) => {
        if (button.textContent?.toLowerCase() !== period.replace('in_', '').toLowerCase()) {
          button.classList.remove('btn', 'btn-success')
          button.classList.add('btn', 'btn-primary')
        } else {
          button.classList.remove('btn', 'btn-primary')
          button.classList.add('btn', 'btn-success')
        }
      })
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
</style>
