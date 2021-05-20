import Vue from 'vue'
import VueRouter from 'vue-router'

import RotatingCubes from '@/views/RotatingCubes.vue'
import ResponsiveRotatingCubes from '@/views/ResponsiveRotatingCubes.vue'
import ResponsiveRotatingCubesHDDPI from '@/views/ResponsiveRotatingCubesHDDPI.vue'
import AdjustableCube from '@/views/AdjustableCube.vue'
import Geometries from '@/views/Geometries.vue'
import Space1 from '@/views/Space1.vue'
import Space2 from '@/views/Space2.vue'
import Space3 from '@/views/Space3.vue'

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
  {
    path: '/adjustable-cube',
    name: 'AdjustableCube',
    component: AdjustableCube
  },
  {
    path: '/geometries',
    name: 'Geometries',
    component: Geometries
  },
  {
    path: '/space1',
    name: 'Space1',
    component: Space1
  },
  {
    path: '/space2',
    name: 'Space2',
    component: Space2
  },
  {
    path: '/space3',
    name: 'Space3',
    component: Space3
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
