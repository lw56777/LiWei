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
      name: 'Draggable'
    },
    children: [
      {
        path: '/playground/draggable',
        name: 'Draggable',
        meta: {
          title: '拖拽组件'
        },
        component: () => import('@/views/Draggable.vue')
      },
      {
        path: '/playground/dialog',
        name: 'Dialog',
        meta: {
          title: '对话框'
        },
        component: () => import('@/views/Dialog.vue')
      },
      {
        path: '/playground/starport',
        name: 'Starport',
        meta: {
          title: '星港'
        },
        component: () => import('@/views/Starport.vue'),
        redirect: {
          name: 'StarportStart'
        },
        children: [
          {
            path: '/playground/starport/start',
            name: 'StarportStart',
            component: () => import('@/views/Start.vue'),
          },
          {
            path: '/playground/starport/end',
            name: 'StarportEnd',
            component: () => import('@/views/End.vue'),
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;