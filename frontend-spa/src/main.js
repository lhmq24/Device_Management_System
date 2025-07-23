import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'

import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

app
  .use(router)
  .use(VueQueryPlugin)
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
  })
  .mount('#app')
