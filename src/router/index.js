import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/HomePage'
import Locations from '../components/Location/Locations'
import LocationsOfFollowers from '../components/Location/LocationsOfFollowers'
import CreateLocation from '../components/Location/CreateLocation'
import LocationDetails from '../components/Location/LocationDetails'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations
  },
  {
    path: '/location/followers',
    name: 'Locations Of Followers',
    component: LocationsOfFollowers
  },
  {
    path: '/locations/new',
    name: 'CreateLocation',
    component: CreateLocation,
    beforeEnter: AuthGuard
  },
  {
    path: '/locations/:id',
    name: 'LocationDetails',
    props: true,
    component: LocationDetails
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  }
  ,
  {
    path: '/user/signin',
    name: 'Signin',
    component: Signin
  }
  ,
  {
    path: '/user/signup',
    name: 'Signup',
    component: Signup
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
