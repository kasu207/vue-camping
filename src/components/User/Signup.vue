<template>
<v-layout>
    <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
            <app-alert @dissmissed="onDissmissed" :text="error.message">
            </app-alert>
        </v-flex>
    </v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
            <v-card-title>Sign Up</v-card-title>
            <v-card-subtitle>Get your account to create and rate locations.</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="onSignup">
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
                                <v-text-field
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    :rules="[comparePasswords]"
                                    >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-btn type="submit" :disabled="loading" :loading="loading">
                                    SignUp
                                    <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                </v-btn>
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
            confirmPassword: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    computed:{
        comparePasswords(){
            return this.password !== this.confirmPassword ? 'Passwords do not match!' : ''
        },
        user () {
            console.log(this.$store.getters.user)
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        },
        loading () {
            return this.$store.getters.loading
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
        onSignup(){
            //Vuex
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password} )
        },
        onDissmissed () {
            console.log('Dissmissed Alert')
            this.$store.dispatch('clearError')
        }
    }
}
</script>