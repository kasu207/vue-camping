<template>
<div>
  <!--App Bar -->
    <v-app-bar
      app
      color="white"
      height="100"
      flat
    >
    <v-layout align-center>
        <v-flex>
            <v-text-field 
                placeholder="search spots" 
                flat 
                solo-inverted
                color="grey"
                prepend-inner-icon="mdi-magnify"
                class="mt-7"
            />
        </v-flex>
            <v-btn height="48" class="mx-2 ml-4" dark>
                <v-icon> mdi-magnify
                </v-icon>
            </v-btn>
            <v-btn
                height="48" 
                class="mx-1 ml-2">
                <v-icon> mdi-filter-menu
                </v-icon>
            </v-btn>
            <v-btn height="48" class="mx-1 ml-2" @click="showMap = !showMap">
                <v-icon> mdi-map
                </v-icon>
            </v-btn>
            <v-btn height="48" class="mx-2 ml-4" color="purple" dark v-bind:to="'/locations/new'">
                <v-icon> mdi-plus
                </v-icon>
                add spot
            </v-btn>

        <!--Start User menu-->
        <!--if user is authenticated-->
        <div v-if="userIsAuthenticated" >
          <div class="text-right">
            <v-layout align-center class="pa-0">
              <v-avatar size="30" class="grey">
                    <v-img/>
                </v-avatar>
                <v-flex class="mx-2">
                  <span>Hello, Philipp</span>
                            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  light
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in usermenu"
                  link
                  v-bind:to="item.link"
                  :key="i"
                >
                    <v-list-item-icon>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item link v-if="userIsAuthenticated" >
                    <v-list-item-icon>
                      <v-icon>mdi-message-reply-text</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title> Messages</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-if="userIsAuthenticated" >
                  <v-list-item-icon>
                    <v-icon>mdi-bell</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> Notifications</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar 
                    size="25"
                    color="orange" 
                    class="white--text subtitle-2"
                    >2
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item link @click="onLogout" v-if="userIsAuthenticated" >
                    <v-list-item-icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title> Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                </v-menu>
                </v-flex>
            </v-layout>
          </div>
        </div>
          <!--End if user is authenticated-->
          <div v-else>
          <v-btn height="48" class="mx-2 ml-2" color="" dark v-bind:to="'/user/signin'">
                <v-icon> mdi-login
                </v-icon>
                SignIn
            </v-btn>
          </div>
          <!--End User menu-->
    </v-layout>
    </v-app-bar>
<!--End App Bar-->

<!--Navigation Drawer--> 
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content flat>
          <v-list-item-title class="title">
            Park4night
          </v-list-item-title>
          <v-list-item-subtitle>
            Share beatiful places
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
          router
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-layout align-center class="my-8">
      <v-card flat class="mx-auto">
          <v-layout class="pt-2 px-5">
              <v-img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/into_the_night_vumi.svg"/>
          </v-layout>
      </v-card>
      </v-layout>
      <v-container>
<v-layout align-center class="my-8">
          <div class="mx-auto">
              <v-btn 
                class="my-3"
                block>
                <v-icon>mdi-google-play
                </v-icon>
                Download Android
            </v-btn>
            <v-btn 
                block
                class="my-3">
                <v-icon>mdi-apple
                </v-icon>
                Download iOS
            </v-btn>
          </div>
      </v-layout>


      </v-container>
      
    </v-navigation-drawer>
</div>
</template>
<script>

export default {
    components:{
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-rv-truck', link:'/' },
          { title: 'All Locations', icon: 'mdi-earth', link:'/locations' },
          { title: 'Recently Added', icon: 'mdi-update', link:'/recent' },
          { title: 'Spots of Followers', icon: 'mdi-account-group', link:'/followers' },
        ],
        
      }
    },
    computed: {
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      usermenu() {
        let usermenuItems = [
            { title: 'SignUp', icon: 'mdi-face',link:'/user/signup' },
            { title: 'Signin', icon: 'mdi-lock-open',link:'/user/signin' },
          ]
        if (this.userIsAuthenticated) {
          usermenuItems = [
            { title: 'Following', icon: 'mdi-account-group',link:'/follower' }
          ]}
          return usermenuItems
        }   
      },
      methods: {
        onLogout () {
          this.$store.dispatch('logout')
        }
      }
    
}
</script>
<style>

</style>