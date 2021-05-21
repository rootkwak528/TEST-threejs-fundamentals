import Vue from 'vue'
import VueRouter from 'vue-router'

import RotatingCubes from '@/views/RotatingCubes.vue'
import ResponsiveRotatingCubes from '@/views/ResponsiveRotatingCubes.vue'
import ResponsiveRotatingCubesHDDPI from '@/views/ResponsiveRotatingCubesHDDPI.vue'
import ResponsiveRotatingCubesHDDPI2 from '@/views/ResponsiveRotatingCubesHDDPI2.vue'
import AdjustableCube from '@/views/AdjustableCube.vue'
import Geometries from '@/views/Geometries.vue'
import Control1 from '@/views/Control1.vue'
import Control2 from '@/views/Control2.vue'
import Control3 from '@/views/Control3.vue'
import PosterCard from '@/views/PosterCard.vue'
import TextureCube from '@/views/TextureCube.vue'
import TextureCard from '@/views/TextureCard.vue'

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
    path: '/responsive-rotating-cubes-hd-dpi-2',
    name: 'ResponsiveRotatingCubesHDDPI2',
    component: ResponsiveRotatingCubesHDDPI2
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
    path: '/control1',
    name: 'Control1',
    component: Control1
  },
  {
    path: '/control2',
    name: 'Control2',
    component: Control2
  },
  {
    path: '/control3',
    name: 'Control3',
    component: Control3
  },
  {
    path: '/poster-card',
    name: 'PosterCard',
    component: PosterCard
  },
  {
    path: '/texture-cube',
    name: 'TextureCube',
    component: TextureCube
  },
  {
    path: '/texture-card',
    name: 'TextureCard',
    component: TextureCard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
