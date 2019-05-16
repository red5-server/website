import Vue from 'vue'
import App from './App.vue'
import './assets/css/master.css'
import router from './router'
import 'prismjs'

import "prismjs/components/prism-bash"
import "prismjs/components/prism-sql"
import "prismjs/plugins/command-line/prism-command-line"

import 'prismjs/themes/prism.css'
import "prismjs/plugins/command-line/prism-command-line.css"

import Prism from 'vue-prism-component'
import Navbar from './components/Navbar.vue'

Vue.config.productionTip = false

Vue.component('navbar', Navbar)
Vue.component('prism', Prism)

new Vue({
  router,
  render: h => h(App),
  // mounted() {
  //   window.location.hash.length > 0 && window.location.hash.startsWith('#!') && router.push(window.location.hash.substring(2))
  // }
}).$mount('#app')
