import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store'
import firebase from 'firebase'
require('firebase/auth')

import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';


//googleMaps
Vue.config.productionTip = false
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC-qgSaDBe7cOzpLurnao4KUQRrknM2CEI'
  },
  installComponents: true
})

//router
import router from './router'
import AlertCmp from './components/Shared/Alert'
Vue.component('app-alert', AlertCmp)


//leaflet
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


//start App
new Vue({
  vuetify,
  router,
  store,
  
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDV6uc3BUt3DMPgYeZ-dE5zYZk7k5TwWME",
      authDomain: "vue-camping.firebaseapp.com",
      projectId: "vue-camping",
      storageBucket: "gs://vue-camping.appspot.com/",
      messagingSenderId: "306383364009",
      appId: "1:306383364009:web:baf8e899926df6410eeeb8",
      measurementId: "G-K2VN1TEMSF",
      databaseURL:'https://vue-camping-default-rtdb.europe-west1.firebasedatabase.app/'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadedLocations')
  }
}).$mount('#app')
