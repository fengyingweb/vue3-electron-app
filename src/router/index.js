import {createRouter, createWebHashHistory} from 'vue-router';
import {imgLocalUrl} from '@/utils/imgLocalUrl'

const LayOut = ()=> import('@/layout/index.vue')

export const routes = [
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
  {
    path: '/',
    name: 'Review',
    component: LayOut,
    children:[
        {
            path: '/',
            name: 'ReviewIndex',
            meta: {
                title: '审阅区',
                icon: imgLocalUrl('@/assets/layout/review.png'),
            },
            component: () => import('@/views/review/index.vue')
        }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
