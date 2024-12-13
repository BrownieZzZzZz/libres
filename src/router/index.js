import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBook from '@/views/CreateBook.vue'
import NotFound from '@/views/NotFound.vue'
import BookView from '@/views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/create',
      name: 'create',
      component: CreateBook
    },
    {
      path:'/books/:id',
      name: "book",
      component: BookView
    },
    {
      path: "/:catchAll(.*)",
      name: 'Error',
      component: NotFound
    }
  ],
})

export default router
