<template>
    <v-card  
        class="mx-auto my-1"
        style="border-radius: 10px"
        max-width="400"
        hover
        @click="onLoadLocation(meta.id)">
    <v-img
      class="white--text align-end"
      style="border-radius: 10px"
      height= "300px"
      :src="imageUrl"
    >
    <v-card-title>{{meta.title}}</v-card-title>
    <v-card-subtitle class="">
        <v-layout align-center class="pa-0">
            <v-avatar size="30" class="grey">
                <v-img :src="meta.profileImageUrl"/>
            </v-avatar>
            <v-flex class="ml-2 white---text">
                <div class="white--text">{{meta.user}}</div>
            </v-flex>
        </v-layout>
    </v-card-subtitle>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0 mb-0"
      >
        <v-rating
          :value="meta.ranking"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="white--text ml-4">
          {{meta.ranking}} (413)
        </div>
      </v-row>
    </v-card-text>
    </v-img>
  </v-card>
</template>
<script>
export default {
    props: {
      meta: {
            type: Object,
            default: function () {
                return {};
            },
        },
        imageUrl: {
            type: String,
            default: function(){
                return ""
            }
        }
        },
    methods: {
          onLoadLocation(id){
              this.$router.push('/locations/' + id);
          }
    },
}
</script>
<style>

</style>