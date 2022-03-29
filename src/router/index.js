import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/home/list',
    name: 'about',
    component: () => import('../views/home/List.vue'),
    meta: {
      title: '首页跳转列表',
      keepAlive: true,
      isBack: false,
    },
  },
  {
    path: '/home/list/detail',
    name: 'about',
    component: () => import('../views/home/ListDetail.vue'),
    meta: {
      title: '首页跳转列表 三级详情',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于',
      keepAlive: false,
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/Mine.vue'),
    meta: {
      title: '我的',
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
