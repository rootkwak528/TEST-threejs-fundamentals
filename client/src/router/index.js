import Vue from 'vue'
import VueRouter from 'vue-router'

import RotatingCubes from '@/views/RotatingCubes.vue'
import ResponsiveRotatingCubes from '@/views/ResponsiveRotatingCubes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/rotating-cubes',
    name: 'RotatingCubes',
    component: RotatingCubes
  },
  {
    path: '/responsive-rotating-cubes',
    name: 'ResponsiveRotatingCubes',
    component: ResponsiveRotatingCubes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
