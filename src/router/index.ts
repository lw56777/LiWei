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
    children: [
      {
        path: '/playground/draggable',
        name: 'Draggable',
        component: () => import('@/views/Draggable.vue')
      },
      {
        path: '/playground/dialog',
        name: 'Dialog',
        component: () => import('@/views/Dialog.vue')
      },
      {
        path: '/playground/starport',
        name: 'Starport',
        component: () => import('@/views/Starport.vue'),
        children: [
          {
            path: '/playground/starport/starship',
            name: 'Starship',
            component: () => import('@/views/Starship.vue')
          },
          {
            path: '/playground/starport/landing',
            name: 'Landing',
            component: () => import('@/views/Landing.vue')
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