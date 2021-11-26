import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collection/:id',
    name: 'collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutPage.vue')
  },
  {
    path: '/checkout/step1',
    name: 'checkout/step1',
    component: () => import('../views/CheckoutPage.vue')
  },
  {
    path: '/checkout/step2',
    name: 'checkout/step2',
    component: () => import('../views/CheckoutPage.vue')
  },
  {
    path: '/checkout/step3',
    name: 'checkout/step3',
    component: () => import('../views/CheckoutPage.vue')
  },
  {
    path: '/signIn',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //console.log('to', to)
  //console.log('from', from)
  next()
})

export default router
