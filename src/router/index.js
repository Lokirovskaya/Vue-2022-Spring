import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'Post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PostView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/LoginView.vue")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: '/usermanager',
    name: 'usermanager',
    component: () => import('../views/UserManager.vue')
  },
  {
    path: '/personcenter',
    name: 'personcenter',
    component: () => import('../views/PersonCenter.vue')
  },
  {
    path: '/viewifo',
    name: 'viewifo',
    component: () => import('../views/ViewIfo.vue')
  },
  {
    path: '/modifyifo',
    name: 'modifyifo',
    component: () => import('../views/ModifyIfo.vue')
  },
  {
    path: '/sector',
    name: 'sector',
    component: () => import('../views/SectorView.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
