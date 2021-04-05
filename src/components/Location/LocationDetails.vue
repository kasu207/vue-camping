<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="location.imageUrl"
    ></v-img>

    <v-card-title> {{ location.title }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="location.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          {{location.rating}} (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-2">
        Reported by: {{ location.user}}
      </div>
      <div class="my-4 subtitle-2">
        Detailed Information:
      </div>
      <div>{{location.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-subtitle> Activities </v-card-subtitle>
    <v-card-text>
      <v-flex left>
        <v-btn text icon class="mx-1"><v-icon>mdi-campfire</v-icon></v-btn>
        <v-btn text icon class="mx-1"><v-icon>mdi-campfire</v-icon></v-btn>
        <v-btn text icon class="mx-1"><v-icon>mdi-campfire</v-icon></v-btn>
        <v-btn text icon class="mx-1"><v-icon>mdi-campfire</v-icon></v-btn>
      </v-flex>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="navigate"
      >
        Natvigation
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: ['id'],
    computed: {
      location () {
        return this.$store.getters.loadedLocation(this.id)
      }
    },
    data: () => ({
      loading: false,
      selection: 1,
    }),
    methods: {
      navigate () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>