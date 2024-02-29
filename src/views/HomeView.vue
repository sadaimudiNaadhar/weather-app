<template>
  <HeaderComponent />
  <div class="container mt-4">
    <div class="select-container">
      <v-select
        placeholder="Select Weather Station"
        v-model="selectedWeatherStation"
        :options="weatherStations"
        @option:selected="weatherStationSelected"
      ></v-select>
    </div>
  </div>
  <div class="content content-empty" v-if="apiData == null || !selectedWeatherStation">
    <p><i class="bi bi-send"></i></p>
    <p>Search and select weather station</p>
  </div>
  <div class="content container">
    <div class="wrapper" v-if="apiData != null">
      <div class="row">
        <div class="filter-selector-container mt-2">
          <TimeFilter @set-time="setTime" :selectedTimePeriod="selectedTimePeriod" />
        </div>
        <p class="card-text text-end">
          <small class="text-body-secondary">Last updated {{ lastUpdatedTime }} mins ago</small>
        </p>
      </div>

      <div class="row mt-2">
        <div class="col-md-3">
          <WeatherInfo />
          <hr class="d-sm-none" />
        </div>
        <div class="col-md-9">
          <WeatherInfoDetail :selected-time-period="selectedTimePeriod" :api-data="apiData" />
        </div>
      </div>
      <div class="heading mt-3 mb-3">
        <h3>
          <i class="bi bi-geo-alt"> </i>
          <span class="fs-5"> Weather Station Details </span>
        </h3>

        <div class="legend-container">
          <LegendComponent
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
        <div id="weatherLocationMap" class="map-ui"></div>
        <hr class="d-sm-none" />
      </div>
      <div class="col">
        <div id="roadConditionMap" class="map-ui"></div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script lang="ts">
import type { IWeatherApiResponse, MapCoordinates } from '@/types'
import { RoadCondition, RoadConditionColorCode } from '@/types'
import axios from 'axios'
//import { weatherApiResponse } from '@/MockResponse'
import type { RoadConditionData } from '@/types'
import LegendComponent from '../components/Legend.vue'
import vSelect from 'vue-select'
import HeaderComponent from '../components/Header.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import TimeFilter from '../components/TimeFilter.vue'
import WeatherInfoDetail from '../components/WeatherInfoDetail.vue'
import FooterComponent from '../components/Footer.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { weatherApiResponse } from '@/MockResponse'

export default {
  components: {
    HeaderComponent,
    vSelect,
    WeatherInfo,
    LegendComponent,
    TimeFilter,
    WeatherInfoDetail,
    FooterComponent
  },
  data() {
    return {
      selectedTimePeriod: 'Now',
      selectedWeatherStation: '',
      weatherStations: ['P1', 'P2', 'P3', 'P4'],
      lastUpdateTime: null as any,
      isUpdatedTime: false as any,
      apiData: null as any,
      //map
      google: null as any,
      map: null as any,
      roadData: [] as RoadConditionData[],
      roadMiddleCords: {} as MapCoordinates,
      legends: [
        {
          color: 'green',
          text: 'No Snow'
        },
        {
          color: '#99ccff',
          text: 'Light Snow'
        },
        {
          color: 'violet',
          text: 'Medium Snow'
        },
        {
          color: 'orange',
          text: 'High Snow'
        },
        {
          color: 'red',
          text: 'Heavy Snow'
        }
      ]
    }
  },
  async mounted() {
    this.setTime(this.selectedTimePeriod)
  },
  computed: {
    lastUpdatedTime() {
      // Calculate and return the formatted last updated time
      return this.isUpdatedTime ? this.calculateLastUpdatedTime() : 0
    }
  },
  methods: {
    weatherStationSelected() {
      this.submitSearch()
      // Update the lastUpdateTime when an option is selected
      this.lastUpdateTime = new Date()
      setInterval(this.calculateLastUpdatedTime, 60000)
    },
    setTime(period: string) {
      this.selectedTimePeriod = period // Update the selected item
      if (this.roadData.length > 0) {
        this.initializeMapWithRoadData(this.roadMiddleCords, this.roadData) // Refresh map in UI based on selected time
      }
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
    calculateLastUpdatedTime() {
      // Calculate the time difference between now and the lastUpdateTime
      const now = new Date()
      const timeDifference = now - this.lastUpdateTime

      // Convert the time difference to minutes
      const minutes = Math.floor(timeDifference / (1000 * 60))

      this.isUpdatedTime = now

      return `${minutes}`
    },
    async submitSearch() {
      try {
        const response = await axios.post<IWeatherApiResponse>(
          import.meta.env.VITE_WEATHER_API_URL,
          {
            STATID: this.selectedWeatherStation
          }
        )

        // Uncomment this line to enable Mock API
        //response.data = weatherApiResponse as unknown as IWeatherApiResponse

        this.apiData = response.data

        // const { latitude, longitude } = response.data;
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        const mapData = response.data.weatherStationLocation as MapCoordinates

        this.roadData = response.data.roadData

        this.roadMiddleCords = this.getMedianCordinate(this.roadData) as MapCoordinates

        this.initializeMapWithWeatherStaionLocation(mapData)
        this.initializeMapWithRoadData(this.roadMiddleCords, this.roadData)
      } catch (error) {
        console.error(error) // Handle any errors that occur during the request
      }
    },
    async initializeMapWithWeatherStaionLocation(mapCords: MapCoordinates) {
      const latLng = [mapCords.lat, mapCords.lng] as L.LatLngExpression

      const map = L.map('weatherLocationMap').setView(latLng, 12)

      // Set up the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      //Add a circle for the weather station location
      // L.circle(latLng, {
      //   color: '#FF0000',
      //   fillColor: '#FF0000',
      //   fillOpacity: 0.17,
      //   radius: 1000 // Adjust as necessary
      // }).addTo(map);

      // Add a marker with a label for the weather station
      L.marker(latLng)
        .addTo(map)
        .bindPopup('Weather Station: ' + this.selectedWeatherStation)
        .openPopup()
    },
    async initializeMapWithRoadData(mapCords: MapCoordinates, roadData: RoadConditionData[]) {
      const map = L.map('roadConditionMap').setView([mapCords.lat, mapCords.lng], 15)
      // Set up the tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      for (let i = 0; i < roadData.length - 1; i++) {
        let strokeColor

        switch (roadData[i][this.selectedTimePeriod.toLowerCase()]) {
          case RoadCondition.BEST:
            strokeColor = RoadConditionColorCode.GREEN
            break
          case RoadCondition.GOOD:
            strokeColor = RoadConditionColorCode.LIGHT_BLUE
            break
          case RoadCondition.OKAY:
            strokeColor = RoadConditionColorCode.VIOLET
            break
          case RoadCondition.BAD:
            strokeColor = RoadConditionColorCode.ORANGE
            break
          case RoadCondition.WORST:
          case RoadCondition.EXTREME_WORST:
            strokeColor = RoadConditionColorCode.RED
            break
          default:
            strokeColor = RoadConditionColorCode.VIOLET
            break
        }

        const latlngs = [
          [roadData[i].lat, roadData[i].lng],
          [roadData[i + 1].lat, roadData[i + 1].lng]
        ] as L.LatLngExpression[]

        L.polyline(latlngs, {
          color: strokeColor,
          opacity: 1.0,
          weight: 5
        }).addTo(map)
      }
    }
  }
}
</script>

<style scoped>
.map-ui {
  width: 100%;
  height: 400px;
}

.legend-container {
  display: flex;
  gap: 1.2rem;
}
</style>
