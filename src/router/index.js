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
    path: '/example/transformData',
    name: 'TransformData',
    component: () => import(/* webpackChunkName: "[TransformData]" */ '../views/example/TransformData.vue'),
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
