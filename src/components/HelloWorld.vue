<script setup lang="ts">
import type { ApiResponse, MapCoordinates, MapData } from '@/types'
import DropDown from './DropDown.vue'
import axios from 'axios'

let options: object[] = [
  { value: '1', text: 'aa' + ' - ' + '1' },
  { value: '2', text: 'ab' + ' - ' + '2' },
  { value: '3', text: 'bc' + ' - ' + '3' },
  { value: '4', text: 'cd' + ' - ' + '4' },
  { value: '5', text: 'de' + ' - ' + '5' }
]

//map
let props = withDefaults(defineProps<MapData>(), {
  coordinates: null
})
</script>

<template>
  <h1>Searchable Dropdown Example</h1>
  <DropDown :options="options" placeholder="Search options..." />

  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-primary" @click="setTime('Now')">Now</button>
    <button class="btn btn-primary" @click="setTime('8h')">8h</button>
    <button class="btn btn-primary" @click="setTime('18h')">18h</button>
  </div>
  <div class="row">
    <button type="button" class="btn btn-secondary btn-lg" @click="submitSearch()">Search</button>
  </div>

  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">TAUTEMP</th>
        <th scope="col">TEMP</th>
        <th scope="col">BTEMP</th>
        <th scope="col">WINDGESCHW</th>
        <!-- <th scope="col">STZST</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-if="apiData">
        <td>{{ apiData.temperature }}</td>
        <td>{{ apiData.tauTemperature }}</td>
        <td>{{ apiData.bTemperature }}</td>
        <td>{{ apiData.windSpeed }}</td>
      </tr>
    </tbody>
  </table>

  <div id="map" class="google-map"></div>
  <div id="map2" class="google-map"></div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { Easing, Tween, update } from '@tweenjs/tween.js'
export default {
  data() {
    return {
      selectedTimePeriod: '',
      apiData: {} as ApiResponse,
      //map
      google: null as any,
      map: null as any
    }
  },
  async mounted() {
    this.google = new Loader({
      apiKey: 'AIzaSyCkwzRe-yWgV_OgIO6m-MD-R5sknRzMW3A',
      version: 'weekly'
    })

    await this.google.load()
    //await this.initializeMap(props);
  },
  computed: {},
  methods: {
    setTime(period: string) {
      this.selectedTimePeriod = period // Update the selected item

      // Loop through all the buttons and assign appropriate classes
      const buttons = document.querySelectorAll('button')
      buttons.forEach((button) => {
        if (button.textContent !== period) {
          button.classList.remove('btn', 'btn-success')
          button.classList.add('btn', 'btn-primary')
        } else {
          button.classList.remove('btn', 'btn-primary')
          button.classList.add('btn', 'btn-success')
        }
      })
    },
    getMedianCordinate(sensorData: MapCoordinates[]) {
      sensorData.sort((a, b) => a.latitude - b.latitude)
      const medianIndex = Math.floor(sensorData.length / 2)
      let medianCoordinate

      if (sensorData.length % 2 === 0) {
        const coordinate1 = sensorData[medianIndex - 1]
        const coordinate2 = sensorData[medianIndex]
        const medianLatitude = (coordinate1.latitude + coordinate2.latitude) / 2
        const medianLongitude = (coordinate1.longitude + coordinate2.longitude) / 2
        medianCoordinate = { latitude: medianLatitude, longitude: medianLongitude }
      } else {
        medianCoordinate = sensorData[medianIndex]
      }

      return medianCoordinate
    },
    async submitSearch() {
      try {
        const response = await axios.post<ApiResponse>('https://en3fqjhwcwvas.x.pipedream.net', {
          // Request payload or data
          // Replace with your actual data
          address: '123 Example St, City'
        })

        response.data = {
          weatherStationId: 121 + Math.random(),
          temperature: 121 + Math.random(),
          tauTemperature: 121 + Math.random(),
          bTemperature: 121 + Math.random(),
          windSpeed: 121 + Math.random(),
          weatherStationLocation: {
            latitude: 50,
            longitude: 40
          },
          sensorData: [
            { latitude: 37.782551, longitude: -122.445368 },
            { latitude: 37.782745, longitude: -122.444586 },
            { latitude: 37.782842, longitude: -122.443688 },
            { latitude: 37.782919, longitude: -122.442815 },
            { latitude: 37.782992, longitude: -122.442112 },
            { latitude: 37.7831, longitude: -122.441461 },
            { latitude: 37.783206, longitude: -122.440829 },
            { latitude: 37.783273, longitude: -122.440324 },
            { latitude: 37.783316, longitude: -122.440023 },
            { latitude: 37.783357, longitude: -122.439794 },
            { latitude: 37.783371, longitude: -122.439687 },
            { latitude: 37.783368, longitude: -122.439666 },
            { latitude: 37.783383, longitude: -122.439594 },
            { latitude: 37.783508, longitude: -122.439525 },
            { latitude: 37.783842, longitude: -122.439591 },
            { latitude: 37.784147, longitude: -122.439668 },
            { latitude: 37.784206, longitude: -122.439686 },
            { latitude: 37.784386, longitude: -122.43979 },
            { latitude: 37.784701, longitude: -122.439902 },
            { latitude: 37.784965, longitude: -122.439938 },
            { latitude: 37.78501, longitude: -122.439947 },
            { latitude: 37.78536, longitude: -122.439952 },
            { latitude: 37.785715, longitude: -122.44003 },
            { latitude: 37.786117, longitude: -122.440119 },
            { latitude: 37.786564, longitude: -122.440209 },
            { latitude: 37.786905, longitude: -122.44027 }
          ]
        } as ApiResponse

        this.apiData = response.data

        // const { latitude, longitude } = response.data;
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        const mapData = {
          coordinates: response.data.weatherStationLocation
        } as MapData

        const sensorData = response.data.sensorData

        const sensorBeginCords = {
          coordinates: this.getMedianCordinate(sensorData)
        } as MapData

        const pathCoordinates = sensorData.map((coordinate) => {
          return new google.maps.LatLng(coordinate.latitude, coordinate.longitude)
        })

        await this.initializeMap(mapData)
        await this.initializeMap2(sensorBeginCords, pathCoordinates)

        //this.$emit("show-map", response.data.weatherStationLocation as MapCoordinates);
      } catch (error) {
        console.error(error) // Handle any errors that occur during the request
      }
    },
    async initializeMap(props: MapData) {
      if (props.coordinates === null) {
        return
      }

      const latitude = props.coordinates.latitude
      const longitude = props.coordinates.longitude
      const latLng = { lat: latitude, lng: longitude }

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
        title: 'Hello World!'
      })

      cityCircle.setMap(map)
      marker.setMap(map)
    },
    async initializeMap2(props: MapData, pathCoordinates: google.maps.LatLng[]) {
      if (props.coordinates === null) {
        return
      }

      const latitude = props.coordinates.latitude
      const longitude = props.coordinates.longitude
      const latLng = { lat: latitude, lng: longitude }

      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
      const { HeatmapLayer } = (await google.maps.importLibrary(
        'visualization'
      )) as google.maps.VisualizationLibrary
      const map = new Map(document.getElementById('map2') as HTMLElement, {
        center: latLng,
        zoom: 16,
        mapId: '15431d2b469f209e'
      })

      const cameraOptions: google.maps.CameraOptions = {
        tilt: 0,
        heading: 0,
        zoom: 3,
        center: latLng
      }

      const gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]

      const heatmap = new HeatmapLayer({
        data: pathCoordinates,
        map: map
      })
      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient)
      heatmap.setMap(map)

      // // install Tweenjs with npm i @tweenjs/tween.js
      new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
        .to({ tilt: 65, heading: 90, zoom: 18 }, 15000) // Move to destination in 15 second.
        .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(() => {
          map.moveCamera(cameraOptions)
        })
        .start() // Start the tween immediately.

      // Setup the animation loop.
      function animate(time: number) {
        requestAnimationFrame(animate)
        update(time)
      }

      requestAnimationFrame(animate)

      // cityCircle.setMap(map);
      // marker.setMap(map);

      // const panorama = new google.maps.StreetViewPanorama(
      //   document.getElementById("map") as HTMLElement,
      //   {
      //     position: latLng,
      //     pov: {
      //       heading: 34,
      //       pitch: 10,
      //     },
      //   }
      // );

      // map.setStreetView(panorama);
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
