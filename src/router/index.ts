import { createRouter, createWebHistory } from 'vue-router'
import { isFeatureEnabled, type FeatureKey } from '../config/features'

declare module 'vue-router' {
  interface RouteMeta {
    feature?: FeatureKey
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/dashboard/index.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'events' },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../pages/calendar/index.vue'),
      meta: { feature: 'calendar' },
    },
    {
      path: '/guests',
      name: 'guests',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'guests' },
    },
    {
      path: '/budget',
      name: 'budget',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'budget' },
    },
    {
      path: '/vendors',
      name: 'vendors',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'vendors' },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'tasks' },
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../pages/placeholder/index.vue'),
      meta: { feature: 'reports' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/placeholder/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// Navigation Guard: Cegah akses langsung via URL ke fitur yang dinonaktifkan di .env
router.beforeEach((to, from, next) => {
  if (to.meta.feature && !isFeatureEnabled(to.meta.feature)) {
    return next({ path: '/dashboard' })
  }
  next()
})

export default router
