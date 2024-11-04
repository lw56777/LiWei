import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';

import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import('@/views/Playground.vue'),
    redirect: {
      name: 'Bubbling'
    },
    children: [
      {
        path: '/playground/bubbling',
        name: 'Bubbling',
        meta: {
          title: '全都是泡沫'
        },
        component: () => import('@/views/Bubbling.vue')
      },
      {
        path: '/playground/draggable',
        name: 'Draggable',
        meta: {
          title: '拖拽排序'
        },
        component: () => import('@/views/Draggable.vue')
      },
      {
        path: '/playground/dialog',
        name: 'Dialog',
        meta: {
          title: '对话框封装'
        },
        component: () => import('@/views/Dialog.vue')
      },
      {
        path: '/playground/starport',
        name: 'Starport',
        meta: {
          title: '跨页面动画'
        },
        component: () => import('@/views/Starport.vue'),
        redirect: {
          name: 'StarportStart'
        },
        children: [
          {
            path: '/playground/starport/start',
            name: 'StarportStart',
            meta: {
              title: '页面A'
            },
            component: () => import('@/views/Start.vue'),
          },
          {
            path: '/playground/starport/end',
            name: 'StarportEnd',
            meta: {
              title: '页面B'
            },
            component: () => import('@/views/End.vue'),
          }
        ]
      },
      {
        path: '/playground/datetime',
        name: 'DateTime',
        meta: {
          title: '日期时间选择'
        },
        component: () => import('@/views/DateTime.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;