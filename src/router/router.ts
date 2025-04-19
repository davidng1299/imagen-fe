import { createWebHistory, createRouter } from 'vue-router'
import PromptView from '../views/PromptView.vue'
import GalleryView from '../views/GalleryView.vue'

const routes = [
  { path: '/', component: PromptView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
