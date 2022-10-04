import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import VueCurrencyFilter from 'vue-currency-filter'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'

const Pimex = window.Pimex

Pimex.init({
  id: 47675,
  token: 'RJlpyWeQJvffdPGJ1IxvQFZj9'
}, false)

Vue.use(VueMoment)
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ArgonDashboard)

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
})
new Vue({
  router,
  store,
  render: h => h(App),
  components: { App }
}).$mount('#app')
