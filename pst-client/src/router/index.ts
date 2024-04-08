import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [{ path: '/dashboard', name: 'Dashboard', component: Dashboard }]
    },
    {
      path: '/auth',
      redirect: '/login',
      name: 'Auth',
      component: AuthLayout,
      meta: { isGuest: true },
      children: [
        {
          path: '/login',
          name: 'AuthLogin',
          component: LoginView
        },
        {
          path: '/register',
          name: 'AuthRegister',
          component: RegisterView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user.token) {
    next({ name: 'AuthLogin' })
  } else if (authStore.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
