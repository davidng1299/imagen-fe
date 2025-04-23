/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import { definePreset } from '@primeuix/themes'
import router from './router/router'
import Avatar from 'primevue/avatar'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import { Form } from '@primevue/forms'
import { FormField } from '@primevue/forms'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Popover from 'primevue/popover'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f6f7f9',
      100: '#eceff2',
      200: '#d4dae3',
      300: '#aebbcb',
      400: '#8296ae',
      500: '#637a94',
      600: '#526681',
      700: '#404f64',
      800: '#384354',
      900: '#323b48',
      950: '#212630',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(createPinia())

app.component('Avatar', Avatar)
app.component('Button', Button)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Form', Form)
app.component('FormField', FormField)
app.component('Image', Image)
app.component('InputText', InputText)
app.component('Message', Message)
app.component('Popover', Popover)
app.component('Select', Select)
app.component('SelectButton', SelectButton)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.directive('tooltip', Tooltip)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primeui, primevue, primevue-tailwind, tailwind-utilities;',
      },
    },
  },
})
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  }),
)

app.mount('#app')
