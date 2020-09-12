import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home'
import Content from "../pages/content";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/video',
    name: 'Video',
    component: Content
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
