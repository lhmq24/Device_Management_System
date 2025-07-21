import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import GoogleLoginPlugin from 'vue3-google-login'

const app = createApp(App)

app
  .use(router)
  .use(VueQueryPlugin)
  .use(GoogleLoginPlugin, {
    clientId: '995921739137-qg3o1in691pjqn3i1qf9duutfts5m9lm.apps.googleusercontent.com',
  })
  .mount('#app')
