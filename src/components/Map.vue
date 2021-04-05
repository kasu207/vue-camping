<template>
<v-layout justify-center>
    <div>
        <h2 align-center>Your current coordinates</h2>
        <p> {{ coordinates.lat }} Lattitude, {{ coordinates.lng }} Longitude </p>
        <p>Markers:</p>
        <p v-bind:key="index1" v-for="(k, index1) in markers"> {{ k.position }}</p>
        <p>POIS</p>
        <p v-bind:key="index" v-for="(m, index) in positions"> {{ m }}</p>
        <GmapMap
            :center="coordinates"
            :zoom="10"
            style="width:640px; height:360px; margin: 32px auto"
            ref="mapRef">
            <GmapMarker
                :key="index"
                v-for="(p, index) in positions"
                :position="p"
                :clickable="true"
                @click="center=p"
            />
        </GmapMap>
    </div>
</v-layout>
</template>
<script>
import firebase from 'firebase'
require('firebase/auth')

export default {
    data() {
        return {
            map: null,
            coordinates: {
                lat: 0,
                lng: 0
            },
            markers: [
            {
                position: {
                    lat: 51.509031099999994,
                    lng: 11.9476357,
                }
            },
            {
                position: {
                    lat: 51.174270,
                    lng: 16.329620,
                }
            },
            {
                position: {
                    lat: 51.0527,
                    lng: 13.7452,
                }
            },
            {
                position: {
                         lat: 151.2239111,
                         lng: -33.8761991
                         }
            },
            {
                position: {
                    "lat": 174.7772114,
                    "lng": -41.2887953
                }
            },
            {
                position: { "lat": 14.4275735, "lng":51.1813907}
            },
                {
                position:{ "lat": 13.8146591, "lng": 52.0752709 }
            }
            ]
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        },
        positions() {
            var pois = []
            var storePositions = firebase.database().ref('locations')
            storePositions.on('value', (snapshot) => {
                const obj = snapshot.val();
                for (let key in obj){
                 pois.push(obj[key].coordinates)
                }
                pois = pois.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng)}));
                console.log(pois)
            })
            return pois
         }
    },
    created() {
        //get users location
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => alert(error));

    },
    mounted(){
        //add the map to data object
        this.$refs.mapRef.$mapPromise.then(map => this.map = map)
    }
}
</script>
<style>

</style>