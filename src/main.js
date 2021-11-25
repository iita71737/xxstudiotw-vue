import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/application.scss'
import store from './store'
import '../commons/auth'


createApp(App).use(router).use(store).mount('#app')
