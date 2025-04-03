import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PromptView from '../views/PromptView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/prompt', name: 'prompt', component: PromptView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
