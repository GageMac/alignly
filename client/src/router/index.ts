import { createRouter, createWebHistory } from 'vue-router'
import ResumeOptimizer from '@/components/ResumeOptimizer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ResumeOptimizer,
    },
  ],
})

export default router
