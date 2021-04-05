<template>
<div>  
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="primary--text">Create a new Location </h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-form @submit.prevent="onCreateLocation">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title*"
                                v-model="title"
                                id="title"
                                requiered>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location*"
                                v-model="location"
                                id="location"
                                requiered>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6 sm6 offset-sm3>
                            <v-text-field
                                name="latitude"
                                label="Latitude*"
                                v-model="latitude"
                                id="latitude"
                                requiered>
                            </v-text-field>
                            <v-text-field
                                name="longitude"
                                label="Longitude*"
                                v-model="longitude"
                                id="longitude"
                                requiered>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="Description"
                                label="Description*"
                                v-model="description"
                                id="description"
                                placeholder="Set a small description for that location"
                                auto-grow
                                requiered>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row my-3>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-select
                            v-model="e7"
                            :items="filters"
                            label="Select"
                            multiple
                            chips
                            hint="Which features does this spot has?"
                            persistent-hint
                            >
                            </v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row clas="my-3">
                        <v-flex xs12 sm6 offset-sm3 my-3>
                            <v-btn my-5 raised class="red" @click="onPickFile" dark> Upload Image</v-btn>
                            <input 
                                type=file 
                                style="display: none" 
                                ref="fileInput" 
                                accept="image/*"
                                @change="onFilePicked"
                                >

                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 my-3>
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                                    v-if="loading"
                                >
                            </v-progress-circular>
                            <img mt-3 :src="imageUrl" height="150px">
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 mb-3>
                            <div>Rating</div>
                            <div class="text-left">
                                <v-rating v-model="rating"></v-rating>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 mb-5>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" class="primary" :disabled="!formIsValid">Create Location</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>
<script>
export default {
    data () {
        return {
            title:'',
            location: '',
            imageUrl: '',
            description: '',
            rating: 3,
            longitude:'',
            lattitude:'',
            e7:[],
            filters:['hiking', 'climbing', 'swimming', 'fishing', 'dogs', 'toilet', 'fresh water', 'gray water', 'fire', 'long stay', 'close to town', 'electricity'],
            image: null
       }
    },
    computed: {
        formIsValid () {
            return this.title !== '' &&
             this.location !=='' &&
              this.latitude !== ''&& 
              this.longitude !== '' && 
              this.imageUrl !=='' && 
              this.description !== ''
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    methods: {
        onCreateLocation (){
            if (!this.formIsValid) {
                return
            }
            if( !this.image ){
                return
            }
            const locationData = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                rating: this.rating,
                coordinates:{
                    lat: this.latitude,
                    lng: this.longitude
                },
                filters: this.filters,
                creationDate: new Date().toISOString()
            }
            this.$store.dispatch('createLocation', locationData)
            this.$router.push('/locations')
        },
        onPickFile () {
            this.$refs.fileInput.click();
        },
        onFilePicked (e) {
            const files = e.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0){
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
<style>

</style>