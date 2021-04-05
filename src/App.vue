<template>

  <v-app>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
      <Nav/>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
        <div>
            <v-btn
                elevation="2"
                fab
                dark
                fixed
                right
                bottom
                color="cyan"
                v-bind:to="'/locations/new'"
            >
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </div>
      </v-main>
  </v-app>
</template>
<script>
import Nav from '../src/components/Nav/Nav'

export default {
    components:{
      Nav,
    },
    data () {
      return {
      }
    },
}
</script>
<style>
.basemap {
  width: 100%;
  height: 100%;
}
</style>