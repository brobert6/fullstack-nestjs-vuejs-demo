import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import CityEditView from '@/views/cities/CityEditView.vue'
import CitiesView from '@/views/cities/CitiesView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/test', name: 'TestPage', component: TestView }
      ]
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
    },
    // Routes for cities management
    {
      path: '/cities',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'list', name: 'CitiesList', component: CitiesView },
        //{ path: 'details/:id', name: 'CityDetails', component: CityDetailsView },
        {
          path: ':id/edit',
          name: 'EditCity',
          component: CityEditView,
          meta: { requiresAdmin: true } // Requires admin role
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
