import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})

export default router
