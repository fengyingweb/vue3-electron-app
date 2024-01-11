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
  {
    path: '/reviewHistory',
    name: 'ReviewHistory',
    component: LayOut,
    children:[
        {
            path: '/ReviewHistory',
            name: 'ReviewHistory',
            meta: {
                title: '审阅区历史',
                icon:imgLocalUrl('@/assets/layout/history.png'),
            },
            component: () => import('@/views/review-history/index.vue'),
        },
    ]
  },
  {
      path: '/notice',
      name: 'Notice',
      component: LayOut,
      children:[
          {
              path: '/notice',
              name: 'Notice',
              meta: {
                  title: '消息提醒',
                  icon:imgLocalUrl('@/assets/layout/xiaoxitixing.png'),
              },
              component: () => import('@/views/notice/index.vue'),
          },
      ]
  },
  {
      path: '/settings',
      name: 'Settings',
      component: LayOut,
      children:[
          {
              path: '/settings',
              name: 'Settings',
              meta: {
                  title: '配置管理',
                  icon:imgLocalUrl('@/assets/layout/settings.png'),
              },
              component: () => import('@/views/settings/index.vue'),
          },
      ]
  },
  {
      path: '/user',
      name: 'User',
      component: LayOut,
      children:[
          {
              path: '/user',
              name: 'User',
              meta: {
                  title: '用户管理',
                  icon:imgLocalUrl('@/assets/layout/user.png'),
              },
              component: () => import('@/views/user/index.vue'),
          },
      ]
  },
  {
      path: '/operate',
      name: 'Operate',
      component: LayOut,
      children:[
          {
              path: '/operate',
              name: 'Operate',
              meta: {
                  title: '运营管理',
                  icon:imgLocalUrl('@/assets/layout/operate.png'),
              },
              component: () => import('@/views/operate/index.vue'),
          },
      ]
  },
  {
      path: '/news',
      name: 'News',
      component: LayOut,
      hidden: true,
      children:[
          {
              path: '/news',
              name: 'News',
              component: () => import('@/views/news/index.vue'),
          },
      ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
