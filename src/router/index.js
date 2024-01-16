import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/user/HomeView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SearchViewVue from '@/views/user/SearchView.vue'
import SuccessViewVue from '@/views/user/SuccessView.vue'
import CartViewVue from '@/views/user/CartView.vue'
import CheckoutViewVue from '@/views/user/CheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchViewVue
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessViewVue
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartViewVue
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutViewVue
    }
  ]
})

export default router
