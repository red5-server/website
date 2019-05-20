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
    },
    ////////////////////////////////////////////////////////////////////////////
    /// Guides
    ////////////////////////////////////////////////////////////////////////////
    {
      path: '/guide/routing',
      name: 'routing',
      component: () => import('./views/guide/api/Routing.vue')
    },
    {
      path: '/guide/middleware',
      name: 'middleware',
      component: () => import('./views/guide/api/Middleware.vue')
    },
    {
      path: '/guide/storage',
      name: 'storage',
      component: () => import('./views/guide/api/Storage.vue')
    },
    {
      path: '/guide/sessions',
      name: 'sessions',
      component: () => import('./views/guide/api/Sessions.vue')
    },
    // {
    //   path: '/guide/mysql',
    //   name: 'mysql',
    //   component: () => import('./views/guide/api/Mysql.vue')
    // },
    ////////////////////////////////////////////////////////////////////////////
    /// Tutorials
    ////////////////////////////////////////////////////////////////////////////
    {
      path: '/tutorials/uploads',
      name: 'uploads',
      component: () => import('./views/guide/tutorials/Uploads.vue')
    },
    {
      path: '/tutorials/plugins',
      name: 'plugins',
      component: () => import('./views/guide/tutorials/Plugins.vue')
    },
    // {
    //   path: '/tutorials/login',
    //   name: 'login',
    //   component: () => import('./views/guide/tutorials/Login.vue')
    // }
  ]
})
