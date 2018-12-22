import Vue from 'vue'
import App from './App.vue'
import './assets/css/master.css'
import router from './router'
import 'prismjs'

import "prismjs/components/prism-bash"
import "prismjs/plugins/command-line/prism-command-line"

import 'prismjs/themes/prism.css'
import "prismjs/plugins/command-line/prism-command-line.css"

Vue.config.productionTip = false

// router.afterEach((to, from) => {
//   Prism.highlightAll()
// })

new Vue({
  router,
  render: h => h(App),
  // mounted() {
  //   window.location.hash.length > 0 && window.location.hash.startsWith('#!') && router.push(window.location.hash.substring(2))
  // }
}).$mount('#app')
