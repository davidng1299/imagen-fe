import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomeView.vue'
import PromptView from '../views/PromptView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/prompt', name: 'prompt', component: PromptView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
