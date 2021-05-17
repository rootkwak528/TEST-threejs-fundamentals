import Vue from 'vue'
import VueRouter from 'vue-router'
import RotatingCube from '@/views/RotatingCube.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/rotating-cube',
    name: 'RotatingCube',
    component: RotatingCube
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
