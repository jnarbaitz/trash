<template>
  <v-container fluid class="py-0 px-0">
    <section>
      <v-flex xs12 v-if="error">
        <v-layout row>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-layout>
      </v-flex>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar dark color="primary" flat>
                <v-toolbar-title >
                  Sign In
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-container @keyup.enter="onSubmit">
                  <v-form>
                    <v-text-field
                    label="Username"
                    v-model.trim="login.username"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    v-model.trim="login.password"
                    type="password"
                    required
                    ></v-text-field>
                    <v-card-actions>
                      <v-btn 
                      block 
                      @click="onSubmit"
                      :disabled="loading" 
                      :loading="loading"
                      >
                      Submit
                      </v-btn>
                      <v-btn 
                      block 
                      @click="onRegister"
                      :disabled="loading" 
                      :loading="loading"
                      >
                      Register
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-container>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      login: {},
      //errors: []
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('loginUser', this.login)
    },
    onDismissed () {
      console.log('Alert dismissed!')
      this.$store.dispatch('clearError')
    },
    onRegister () {
      this.$router.push({
        name: 'Register'
      })
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>
