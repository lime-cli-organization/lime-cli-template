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
    path: '/home/list',
    name: 'List',
    component: () =>
      import(/* webpackChunkName: "[home]" */ '../views/home/List.vue'),
    meta: {
      title: '首页跳转列表',
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/home/list/detail',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "[home]" */ '../views/home/ListDetail.vue'),
    meta: {
      title: '首页跳转列表 三级详情',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "[about]" */ '../views/About.vue'),
    meta: {
      title: '关于',
      keepAlive: false,
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () =>
      import(/* webpackChunkName: "[mine]" */ '../views/mine/Mine.vue'),
    meta: {
      title: '我的',
      keepAlive: true,
    },
  },
  {
    path: '/canvas/checkTopic',
    name: 'checkTopic',
    component: () =>
      import(
        /* webpackChunkName: "[canvas]" */ '../views/canvas/CheckTopic.vue'
      ),
  },
  {
    path: '/online/topics',
    name: 'onLineTopics',
    component: () =>
      import(/* webpackChunkName: "[topics]" */ '../views/onLine/Topics.vue'),
    meta: {
      title: '答题',
      keepAlive: true,
    },
  },
  {
    path: '/online/topic/:id',
    name: 'onLineTopic',
    component: () =>
      import(/* webpackChunkName: "[topic]" */ '../views/onLine/Topic.vue'),
    meta: {
      title: '答题',
      keepAlive: true,
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
