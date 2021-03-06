import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login',
    },
    meta: {
      hideTab: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideTab: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "[about]" */ '../views/About.vue'),
    meta: {
      title: '关于',
      keepAlive: false,
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "[mine]" */ '../views/mine/Mine.vue'),
    meta: {
      title: '我的',
      keepAlive: true,
    },
  },
  {
    path: '/example/canvas/editTemplate',
    name: 'EditTemplate',
    component: () => import(/* webpackChunkName: "[canvas]" */ '../views/example/canvas/EditTemplate.vue'),
  },

  {
    path: '/example/keepalive/list',
    name: 'AliveList',
    component: () => import(/* webpackChunkName: "[home]" */ '../views/example/keepalive/List.vue'),
    meta: {
      title: '列表页',
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/example/keepalive/detail',
    name: 'AliveDetail',
    component: () => import(/* webpackChunkName: "[home]" */ '../views/example/keepalive/Detail.vue'),
    meta: {
      title: '详情页',
      keepAlive: false,
    },
  },

  {
    path: '/example/exercise/visibleControl',
    name: 'VisibleControl',
    component: () => import(/* webpackChunkName: "[exercise]" */ '../views/example/exercise/VisibleControl.vue'),
    meta: {
      title: '答题-一次性全量-显示隐藏',
      keepAlive: true,
    },
  },
  {
    path: '/example/exercise/topic/:id',
    name: 'Topic',
    component: () => import(/* webpackChunkName: "[exercise]" */ '../views/example/exercise/Topic.vue'),
    meta: {
      title: '答题-一个一个-页面一题',
      keepAlive: true,
    },
  },
  {
    path: '/example/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "[calendar]" */ '@/views/example/Calendar.vue'),
    meta: {
      title: '日历',
    },
  },
  {
    path: '/example/downloadPDFZip',
    name: 'DownloadPDFZip',
    component: () => import(/* webpackChunkName: "[DownloadPDFZip]" */ '@/views/example/DownloadPDFZip.vue'),
    meta: {
      title: 'PDF压缩下载',
    },
  },
  {
    path: '/example/algorithm',
    name: 'Algorithm',
    component: () => import(/* webpackChunkName: "[algorithm]" */ '../views/example/algorithm/Index.vue'),
    meta: {
      title: '数据解析',
    },
  },
  {
    path: '/example/svg',
    name: 'Svg',
    component: () => import(/* webpackChunkName: "[Svg]" */ '../views/example/Svg.vue'),
    meta: {
      title: 'Svg',
    },
  },
  {
    path: '/example/echarts',
    name: 'Echarts',
    component: () => import(/* webpackChunkName: "[Echarts]" */ '../views/example/Echarts.vue'),
    meta: {
      title: 'Echarts',
    },
  },
  {
    path: '/example/animation',
    name: 'Animation',
    component: () => import(/* webpackChunkName: "[Animation]" */ '../views/example/Animation.vue'),
    meta: {
      title: 'Animation',
    },
  },
  {
    path: '/example/swiper',
    name: 'Swiper',
    component: () => import(/* webpackChunkName: "[Swiper]" */ '../views/example/Swiper.vue'),
    meta: {
      title: 'Swiper',
    },
  },
  {
    path: '/example/external',
    name: 'External',
    component: () => import(/* webpackChunkName: "[External]" */ '../views/example/External.vue'),
    meta: {
      title: 'math.js,day.js',
    },
  },
  {
    path: '/example/select',
    name: 'Select',
    component: () => import(/* webpackChunkName: "[Select]" */ '../views/example/Select.vue'),
    meta: {
      title: 'Select',
    },
  },
  {
    path: '/example/dialog',
    name: 'Dialog',
    component: () => import(/* webpackChunkName: "[Dialog]" */ '../views/example/Dialog.vue'),
    meta: {
      title: 'Dialog',
    },
  },
  {
    path: '/example/skeleton',
    name: 'Skeleton',
    component: () => import(/* webpackChunkName: "[Skeleton]" */ '../views/example/Skeleton.vue'),
    meta: {
      title: 'Skeleton',
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
});

export default router;
