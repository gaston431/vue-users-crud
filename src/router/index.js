import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserFormView from '../views/UserFormView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: UserFormView
  },
  {
    path: '/edit',
    name: 'edit',
    component: UserFormView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
