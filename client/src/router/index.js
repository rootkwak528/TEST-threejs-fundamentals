import Vue from 'vue'
import VueRouter from 'vue-router'

import RotatingCubes from '@/views/RotatingCubes.vue'
import ResponsiveRotatingCubes from '@/views/ResponsiveRotatingCubes.vue'
import ResponsiveRotatingCubesHDDPI from '@/views/ResponsiveRotatingCubesHDDPI.vue'

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
  {
    path: '/responsive-rotating-cubes-hd-dpi',
    name: 'ResponsiveRotatingCubesHDDPI',
    component: ResponsiveRotatingCubesHDDPI
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
