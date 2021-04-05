import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase'
require('firebase/auth')

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        /*loadedLocations: 
            [
                {
                    id: '1',
                    imageUrl: "https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                    title: "Spot in Australia",
                    user: "Jason Fried",
                    profileImageUrl:"https://source.unsplash.com/category/people",
                    rating: 3.2,
                    creationDate: '2020-01-23',
                    description:'',
                    coordinates: {
                        lat: '-33.8761991',
                        lng: '151.2239111'   
                    },
                    filters: [
                        'hiking',
                        'swimming',
                        'fire place',
                        'toilett'
                    ]
                },
                {
                    id: '2',
                    imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                    title: "Spot in New Zealand",
                    user: "Janna Fox",
                    profileImageUrl:"https://source.unsplash.com/200x200",
                    rating: 4.2,
                    creationDate: '2020-02-02',
                    description:'',
                    coordinates: {
                        lat: '-41.2887953',
                        lng: '174.7772114'   
                    },
                    filters: [
                        'hiking',
                        'swimming',
                        'fire place',
                        'toilett'
                    ]
                },
                {
                    id: '3',
                    imageUrl: "https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                    title: "Camping-Spot in Bautzen",
                    user: "Ronny Freund",
                    profileImageUrl:"https://source.unsplash.com/category/cars",
                    rating: 4.5,
                    creationDate: '2020-03-25',
                    description:'',
                    coordinates: {
                        lat: '51.1813907',
                        lng: '14.4275735'   
                    },
                    filters: [
                        'hiking',
                        'swimming',
                        'fire place',
                        'toilett'
                    ]
                },
                {
                    id: '4',
                    imageUrl: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbXBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                    title: "Camping in Spreewald",
                    user: "Lara Croft",
                    profileImageUrl:"https://source.unsplash.com/category/nature",
                    rating: 2.0,
                    creationDate: '2020-07-06',
                    description:'',
                    coordinates: {
                        lat: '52.0752709',
                        lng: '13.8146591'   
                    },
                    filters: [
                        'hiking',
                        'swimming',
                        'fire place',
                        'toilett'
                    ]
                },
                {
                    id: '21sdasf',
                    imageUrl: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
                    title: "Camping auf Sizilien",
                    user: "Lara Croft",
                    profileImageUrl:"https://source.unsplash.com/category/dogs",
                    rating: 5.0,
                    creationDate: '2020-07-07',
                    description:'',
                    coordinates: {
                        lat: '38.018846',
                        lng: '12.885837'   
                    },
                    filters: [
                        'hiking',
                        'swimming',
                        'fire place',
                        'toilett'
                    ]
                }
            ],*/
            user: null, 
            loading:false,
            error: null
    },
    mutations:{
        setLoadedLocations (state, payload ){
            state.loadedLocations = payload
        },
        createLocation (state, payload ) {
            state.loadedLocations.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload){
            state.loading = payload
        },
        setError (state, payload){
            state.error = payload
        },
        clearError (state){
            state.error = null
        }
    },
    actions:{
        loadedLocations ( {commit}) {
            commit('setLoading', true)
            firebase.database().ref('locations').once('value')
                .then( (data) => {
                    const locations = []
                    const obj = data.val()
                    for (let key in obj){
                        locations.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            location: obj[key].location, 
                            rating: obj[key].rating,
                            lat: obj[key].coordinates.lat,
                            lng: obj[key].coordinates.lng,
                            filters: obj[key].filters,
                            creationDate: obj[key].creationDate,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedLocations', locations)
                    commit('setLoading', false) 
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', true)
                    }
                )

        },
        createLocation( {commit, getters}, payload) {
            const location = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                creationDate: payload.creationDate,
                rating: payload.rating,
                coordinates: payload.coordinates,
                filters: payload.filters,
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('locations').push(location)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    console.log(payload.image)
                    return firebase.storage().ref('locations/' + key + ext).put(payload.image)
                })
                .then(fileData => {
                    return fileData.ref.getDownloadURL();
                })
                .then(imageUrl => {
                    return firebase.database().ref('locations').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    commit('createLocation', {
                    ...location,
                    imageUrl:imageUrl,
                    id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        signUserUp( {commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id:  user.user.uid,
                            registeredLocations: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn ( {commit}, payload ){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id:  user.user.uid,
                            registeredLocations: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredLocations: []})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters:{
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
         },
        loadedLocations (state) {
            return state.loadedLocations.sort((locationA, locationB ) => {
                return locationA.rating > locationB.rating
            })
        },

        featuredLocations (state, getters) {
            return getters.loadedLocations.slice(0, 6)
        },

        loadedLocation (state) {
            return (locationId) => {
                return state.loadedLocations.find((location) => {
                    return location.id === locationId
                })
            }
        },
        user (state) {
            return state.user
          },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})