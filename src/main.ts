import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: 'none',
})
app.mount('#app')
