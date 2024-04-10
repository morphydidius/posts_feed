import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';
import PostRegistration from '@/views/Registration';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: HomeView
  },
  {
    path: '/registration',
    name: 'registration',
    component: PostRegistration,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
