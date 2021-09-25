import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/application.scss'
import Carousel3d from 'vue-carousel-3d'
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(Carousel3d)
Vue.use(BootstrapVue)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

