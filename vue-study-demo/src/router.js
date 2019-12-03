import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/store',
      name: 'store',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Store.vue')
    },
    {
      path: '/jstree',
      name: 'jstree',
      component: () => import(/* webpackChunkName: "jsTree" */ './views/JsTree.vue')
    },
    {
      path: '/form',
      name: 'From',
      component: () => import(/* webpackChunkName: "form" */ './views/Form.vue')
    },
    {
      path: '/table',
      name: 'Table',
      component: () => import(/* webpackChunkName: "table" */ './views/Table.vue')
    },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import(/* webpackChunkName: "table" */ './views/Layout.vue')
    },
    {
      path: '/gantt',
      name: 'Gantt',
      component: () => import(/* webpackChunkName: "table" */ './views/Gantt.vue')
    },
    {
      path: '/treegrid',
      name: 'Treegrid',
      component: () => import(/* webpackChunkName: "table" */ './views/Treegrid.vue')
    },
    {
      path: '/tree',
      name: 'Tree',
      component: () => import(/* webpackChunkName: "table" */ './views/Tree.vue')
    },
  ]
})
