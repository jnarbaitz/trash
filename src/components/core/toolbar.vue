<template>
  <v-toolbar 
    v-if="authenticated"
    app 
    clipped-left 
    fixed 
    flat 
    dense 
    color="primary" 
    class="white--text">
    <v-toolbar-side-icon class="hidden-sm-and-up white--text" @click.stop="toggleSidebar"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" style="cursor: pointer" tag="span" class="text-xs-center">
        {{ title }}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        class="hidden-xs-only white--text"
        flat 
        :to="item.path">
          {{ item.title }}
      </v-btn>
      <v-btn class="hidden-xs-only white--text" flat v-if="authenticated" @click="onLogout">
        Logout
      </v-btn>
      <v-btn class="white--text" flat :disabled="$store.getters.user === null || !$store.getters.nfc" icon to="connect">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        title: 'MILDE GUYS'
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