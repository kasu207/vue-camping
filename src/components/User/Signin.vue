<template>
<v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
            <v-card-title>Sign In</v-card-title>
            <v-card-subtitle>Sign in to your account.</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="onSignin">
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                    name="email"
                                    label="Mail"
                                    type="email"
                                    id="email"
                                    :rules="emailRules"
                                    v-model="email"
                                    required
                                    >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    v-model="password"
                                    required
                                    >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-btn type="submit">Sign in</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
</template>
<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    computed:{
        user () {
            console.log(this.$store.getters.user)
            return this.$store.getters.user
        }
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignin(){
            //Vuex
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password} )
        }
    }
}
</script>