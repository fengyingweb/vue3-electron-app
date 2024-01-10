import {createRouter, createWebHashHistory} from 'vue-router';
import {imgLocalUrl} from '@/utils/imgLocalUrl'

const routes = [
  {
    path: '/load',
    name: 'Load',
    hidden: true,
    component: ()=> import('@/views/load/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/views/login/register/index.vue'),
  },
  {
      path: '/resetPassword',
      name: 'ResetPassword',
      hidden: true,
      component: () => import('@/views/login/resetPassword/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
