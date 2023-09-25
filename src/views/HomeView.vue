<template>
  <HeaderComponent />
  <div class="container mt-4">
    <div class="select-container">
      <v-select
        placeholder="Select Weather Station"
        v-model="selectedWeatherStation"
        :options="['P1', 'Option 2', 'Option 3', 'Option 4']"
        @option:selected="weatherStationSelected"
      ></v-select>
    </div>
  </div>
  <div class="content content-empty" v-if="apiData == null || !selectedWeatherStation">
    <p><i class="bi bi-send"></i></p>
    <p>Search and select weather station</p>
  </div>
  <div class="content container" v-else>
    <div class="row ">
      <div class="filter-selector-container mt-2">
        <TimeFilter @set-time="setTime" :selectedTimePeriod="selectedTimePeriod" />
      </div>
      <p class="card-text text-end">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </p>
    </div>

    <div class="row mt-2">
      <div class="col-md-3">
        <WeatherInfo />
        <hr class="d-sm-none" />
      </div>
      <div class="col-md-9">
       <WeatherInfoDetail :selected-time-period="selectedTimePeriod" :api-data="apiData"/>
      </div>
    </div>
    <div class="heading mt-3 mb-3">
      <h3><i class="bi bi-geo-alt"> </i></h3>
      
        <div class="legend-container">
          <LegendComponent
            v-for="legend in legends"
            :color="legend.color"
            :text="legend.text"
            :key="legend.text"
          />
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
  <FooterComponent/>
</template>

<script lang="ts">
import type { IWeatherApiResponse, MapCoordinates } from '@/types'
import { RoadConditionColorCode } from '@/types'
import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'
import { weatherApiResponse } from '@/MockResponse'
import type { RoadConditionData } from '@/types'
import LegendComponent from '../components/Legend.vue'
import vSelect from 'vue-select'
import HeaderComponent from '../components/Header.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import TimeFilter from '../components/TimeFilter.vue'
import WeatherInfoDetail from "../components/WeatherInfoDetail.vue"
import FooterComponent from "../components/Footer.vue"

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
      apiData: null as any,
      //map
      google: null as any,
      map: null as any,
      roadData: [] as RoadConditionData[],
      roadMiddleCords: {} as MapCoordinates,
      selectedCountry: null,
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
  },
  computed: {},
  methods: {
    weatherStationSelected() {
      this.submitSearch()
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
    onCountryChange() {},
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


</style>
<!-- <script setup lang="ts">
 let options: object[] = [
   { value: '1', text: 'aa' + ' - ' + '1' },
   { value: '2', text: 'ab' + ' - ' + '2' },
   { value: '3', text: 'bc' + ' - ' + '3' },
   { value: '4', text: 'cd' + ' - ' + '4' },
   { value: '5', text: 'de' + ' - ' + '5' }
 ]
 </script> -->
