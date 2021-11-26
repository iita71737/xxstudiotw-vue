import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/application.scss'
import store from './store'
import '../commons/auth'
import 'swiper/swiper-bundle.css';
import Loading from '@/components/Loading.vue';

const app = createApp(App);
app.component('Loading', Loading);

app.use(router);
app.use(store)
app.mount('#app')

