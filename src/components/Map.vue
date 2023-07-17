<script setup lang="ts">

</script>

<template>
    <div id="map" class="google-map"></div>
</template>
  
<script lang="ts">

interface City {
    center: google.maps.LatLngLiteral;
    population: number;
}

const citymap: Record<string, City> = {
    chicago: {
        center: { lat: 41.878, lng: -87.629 },
        population: 2714856,
    },
    newyork: {
        center: { lat: 40.714, lng: -74.005 },
        population: 8405837,
    },
    losangeles: {
        center: { lat: 34.052, lng: -118.243 },
        population: 3857799,
    },
    vancouver: {
        center: { lat: 49.25, lng: -123.1 },
        population: 603502,
    },
};


import { Loader } from "@googlemaps/js-api-loader";

export default {
    props: {
        mapConfig: Object,
        apiKey: String,
    },

    data() {
        return {
            google: null as any,
            map: null as any,
        };
    },

    async mounted() {
        this.google = new Loader({
            apiKey: 'AIzaSyCkwzRe-yWgV_OgIO6m-MD-R5sknRzMW3A',
            version: "weekly",
        });

        await this.google.load();
        await this.initializeMap();
    },

    methods: {
        async initializeMap() {
            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 49.25, lng: -123.1 },
                zoom: 8,
            });


            // Add the circle for this city to the map.
            const cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: { lat: 49.25, lng: -123.1 },
                radius: 100 * 100,
            });

            cityCircle.setMap(map);

        },
    },
};
</script>
  
<style scoped>
.google-map {
    width: 100%;
    height: 400px;
}
</style>
  
<!-- <script lang="ts">
import { Loader } from "@googlemaps/js-api-loader";

export default {
    props: {
        mapConfig: Object,
        apiKey: String,
        google: Object,
    },

    data() {
        return {
            google: null,
            map: null
        }
    },

    async mounted() {
        const loader = new Loader({
            apiKey: "AIzaSyCkwzRe-yWgV_OgIO6m-MD-R5sknRzMW3A",
            version: "weekly",
        });

        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            const map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        });
    },

    methods: {

    }
}

</script> -->