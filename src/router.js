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
      path: '/guide/routing',
      name: 'routing',
      component: () => import('./views/guide/Routing.vue')
    },
    {
      path: '/guide/middleware',
      name: 'middleware',
      component: () => import('./views/guide/Middleware.vue')
    },
    {
      path: '/guide/storage',
      name: 'storage',
      component: () => import('./views/guide/Storage.vue')
    },
    {
      path: '/guide/sessions',
      name: 'sessions',
      component: () => import('./views/guide/Sessions.vue')
    },
    {
      path: '/api',
      name: 'api',
      component: () => import('./views/Api.vue')
    }
  ]
})
