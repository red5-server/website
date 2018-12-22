import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() { return { x: 0, y: 0 } },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      component: () => import('./views/GettingStarted.vue')
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('./views/Guide.vue')
    },
    {
      path: '/api',
      name: 'api',
      component: () => import('./views/Api.vue')
    }
  ]
})
