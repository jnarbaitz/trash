<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        title: 'INFINILINC'
      }
    },
    methods: {
      toggleSidebar: function (context) {
        this.$store.commit('toggleSidebar')
      },
      onResize () {
        if (window.innerWidth > 600) {
          this.$store.commit('setShowSidebar', false)
        }
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    },
    computed: {
      items () {
        return this.$store.getters.getMenuItems
      },
      authenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>