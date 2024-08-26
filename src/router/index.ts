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
    component: () => import('@/views/Playground.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;