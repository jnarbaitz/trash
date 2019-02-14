<template>
  <v-container fluid py-0 px-0>
    <v-layout row wrap>
      <v-flex xs12  v-if="!authenticated">
        <v-jumbotron height="100vh"
          src="https://i.imgur.com/YlECO0f.png"
          dark
        >
          <v-container fill-height>
            <v-layout align-center>
              <v-flex text-xs-center>
                <h3 class="display-3" style="text-shadow: 1px 1px #333333;">Gym Boyz</h3>
                <v-flex xs4 offset-xs4>
                  <v-btn block color="primary" large to="/register">Sign up</v-btn>
                </v-flex>
                <v-flex xs4 offset-xs4>
                  <v-btn block color="primary" large to="/login">Sign in</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
      </v-flex>
      <v-flex xs12 v-if="authenticated">
        <profile></profile>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import profile from './Profile'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    authenticated () {
      return this.$store.getters.user !== null
    }
  },
  components: {
    'profile': profile
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
