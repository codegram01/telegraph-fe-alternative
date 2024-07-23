import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/posts',
      component: () => import('@/views/posts/PostsView.vue')
    },{
      path: '/posts/create',
      component: () => import('@/views/posts/CreatePostView.vue')
    },{
      path: '/posts/:path',
      component: () => import('@/views/posts/DetailPostView.vue')
    },{
      path: '/posts/:path/update',
      component: () => import('@/views/posts/PostUpdateView.vue')
    },{
      path: '/test',
      component: () => import('@/views/TestView.vue')
    },{
      path: '/account',
      component: () => import('@/views/AccountView.vue')
    }
  ]
})

export default router
