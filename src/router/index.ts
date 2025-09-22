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
  },
  {
    path: '/playground/danmu',
    name: 'Danmu',
    meta: {
      title: '视频弹幕',
      icon: 'comment-off'
    },
    component: () => import('@/views/Danmu.vue')
  },
  {
    path: '/playground/draw',
    name: 'Draw',
    meta: {
      title: '画布',
      icon: 'huabu'
    },
    component: () => import('@/views/Draw.vue')
  },
  {
    path: '/playground/box-select',
    name: 'BoxSelect',
    meta: {
      title: '框选',
      icon: 'kuangxuan'
    },
    component: () => import('@/views/BoxSelect.vue')
  },
  {
    path: '/playground/full-screen',
    name: 'FullScreen',
    meta: {
      title: '全屏滚动页',
      icon: 'quanpinggundongwangye'
    },
    component: () => import('@/views/FullScreen.vue')
  },
  {
    path: '/playground/dingding',
    name: 'DingDing',
    meta: {
      title: '钉钉动画',
      icon: 'dingding'
    },
    component: () => import('@/views/DingDing.vue')
  },
  {
    path: '/playground/bubbling',
    name: 'Bubbling',
    meta: {
      title: '全都是泡沫',
      icon: 'paomochangshang'
    },
    component: () => import('@/views/Bubbling.vue')
  },
  {
    path: '/playground/draggable',
    name: 'Draggable',
    meta: {
      title: '拖拽排序',
      icon: 'chuangjianshudan-tuozhuaipaixu'
    },
    component: () => import('@/views/Draggable.vue')
  },
  {
    path: '/playground/dialog',
    name: 'Dialog',
    meta: {
      title: '对话框封装',
      icon: 'duihuakuang'
    },
    component: () => import('@/views/Dialog.vue')
  },
  // {
  //   path: '/playground/starport',
  //   name: 'Starport',
  //   meta: {
  //     title: '跨页面动画'
  //   },
  //   component: () => import('@/views/Starport.vue'),
  //   redirect: {
  //     name: 'StarportStart'
  //   },
  //   children: [
  //     {
  //       path: '/playground/starport/start',
  //       name: 'StarportStart',
  //       meta: {
  //         title: '页面A'
  //       },
  //       component: () => import('@/views/Start.vue'),
  //     },
  //     {
  //       path: '/playground/starport/end',
  //       name: 'StarportEnd',
  //       meta: {
  //         title: '页面B'
  //       },
  //       component: () => import('@/views/End.vue'),
  //     }
  //   ]
  // },
  {
    path: '/playground/datetime',
    name: 'DateTime',
    meta: {
      title: '日期时间选择',
      icon: 'riqixuanzeqi'
    },
    component: () => import('@/views/DateTime.vue')
  },
  {
    path: '/iphone',
    name: 'IPhone',
    component: () => import('@/views/IPhone.vue')
  },
  {
    path: '/playground/flow',
    name: 'Flow',
    meta: {
      title: '流程图',
      icon: 'liuchengtu'
    },
    component: () => import('@/views/Flow.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;