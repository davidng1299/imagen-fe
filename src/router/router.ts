import { createWebHistory, createRouter } from 'vue-router'
import PromptView from '../views/PromptView.vue'
import GalleryView from '../views/GalleryView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  { path: '/', component: PromptView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/about', name: 'about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
