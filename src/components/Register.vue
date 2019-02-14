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
                  Sign Up
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-container @keyup.enter="submit">
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                    label="email"
                    v-model.trim="register.email"
                    :rules="emailRules"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="username"
                    v-model.trim="register.username"
                    :rules="usernameRules"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    v-model.trim="register.password"
                    :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                    :type="passwordVisible ? 'password' : 'text'"
                    :rules="passwordRules"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Confirm Password"
                    v-model="password2"
                    :append-icon="password2Visible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (password2Visible = !password2Visible)"
                    :type="password2Visible ? 'password' : 'text'"
                    :rules="passwordRules.concat([comparePasswords])"
                    required
                    ></v-text-field>
                    <v-btn
                    block
                    @click="onSubmit"
                    :disabled="!valid || loading" 
                    :loading="loading"
                    >
                    submit
                    </v-btn>
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
  name: 'Register',
  data () {
    return {
      valid: true,
      register: {},
      password2: '',
      passwordVisible: true,
      password2Visible: true,
      usernameRules: [
        (v) => !!v || 'Cannot be empty!'
      ],
      emailRules: [
        (v) => !!v || 'Cannot be empty!',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Not a valid email address!'
      ],
      passwordRules: [
        (v) => !!v || 'Cannot be empty!',
        (v) => (v && v.length >= 8) || 'Must be at least 8 characters long!'
      ]
    }
  },
  computed: {
      comparePasswords () {
        return this.register.password !== this.password2 ? 'Passwords do not match!' : true
      },
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
      this.$store.dispatch('registerUser', this.register)
    },
    onDismissed () {
      console.log('Alert dismissed!')
      this.$store.dispatch('clearError')
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
