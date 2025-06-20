import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('../views/DefaultView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
    },
    {
      path: '/entry',
      name: 'journal',
      component: () => import('../views/EntriesView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/follower',
      name: 'follower',
      component: () => import('../views/FollowerView.vue'),
    },
    {
      path: '/followerjournals',
      name: 'followerjournals',
      component: () => import('../views/FollowingPageView.vue'),
    },
  ],
})

export default router
