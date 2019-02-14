// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import sidebar from './components/core/sidebar'
import toolbar from './components/core/toolbar'
import alert from './components/core/alert'

Vue.config.productionTip = false
Vue.use(Vuetify)
//Vue.use(BootstrapVue)

// registering components
Vue.component('sidebar', sidebar)
Vue.component('app-alert', alert)
Vue.component('toolbar', toolbar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
