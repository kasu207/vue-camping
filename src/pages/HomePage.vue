<template>
<div>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
    <div class="subtitle-1 grey--text">Search for activities</div>
            <v-sheet
            class="mx-auto my-4"
            max-width="100%"
        >
            <v-slide-group multiple show-arrows center-active>
            <v-slide-item
                v-for="(filter, n) in filters"
                :key="n"
                v-slot:default="{ active, toggle }"
            >
                <v-btn
                    class="mx-2"
                    height="80"
                    min-width="80"
                    :input-value="active"
                    active-class="purple white--text"
                    depressed
                    tile
                    @click="toggle"
                >
                <v-icon top>
                    {{ filter.icon }}
                </v-icon>
                <div class="caption">{{ filter.name }}</div>
                </v-btn>
            </v-slide-item>
            </v-slide-group>
        </v-sheet>
        <div class="subtitle-1 grey--text">Added latest</div>
        <div>
            <div class="text-center">
                <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                v-if="loading"
             ></v-progress-circular>
            </div>
            <stack :column-min-width="250" :gutter-width="8" :gutter-height="8" v-if="!loading">
            <stack-item 
                v-for="location in locations" 
                :key="location.id">
                <location-card 
                    :imageUrl="location.imageUrl" 
                    :meta="{id:location.id, title: location.title, user: location.user, profileImageUrl: location.profileImageUrl, ranking: location.rating}"
                />
            </stack-item>
            </stack>
        </div>
        <div>
            <Map />
        </div>
</div>
</template>
<script>
import { Stack, StackItem } from 'vue-stack-grid';
import Map from '../components/Map'
import LocationCard from '../components/Location/LocationCard';

export default {
    components: { Stack, StackItem, Map, LocationCard },
    computed: {
        locations () {
            return this.$store.getters.featuredLocations
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    
    data() {
      return{
          filters:[
              {
                name:"hiking",
                icon:"mdi-hiking"
              },
              {
                name:"climbing",
                icon:"mdi-carabiner"
              },{
                name:"fishing",
                icon:"mdi-fish"
              },
              {
                  name:"dogs",
                  icon:"mdi-dog-side"
              },
              {
                  name:"swimming",
                  icon:"mdi-swim"
              },
              {
                  name:"toilet",
                  icon:"mdi-toilet"
              },
              {
                  name:"fresh water",
                  icon:"mdi-water-pump"
              },
              {
                  name:"gray water",
                  icon:"mdi-tanker-truck"
              },
              {
                  name:"fire",
                  icon:"mdi-campfire"
              },
              {
                  name:"long stay",
                  icon:"mdi-weather-night"
              },
              {
                  name:"electricity",
                  icon:"mdi-ev-station"
              },
              {
                  name:"close to town",
                  icon:"mdi-basket"
              },
          ],
      }
  },
}
</script>
<style>
</style>