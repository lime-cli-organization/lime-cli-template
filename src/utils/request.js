import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { Toast } from 'vant';
import { getCookie, delCookie } from '@/utils/storage';

const service = axios.create({
  // withCredentials: true,
  baseURL: 'http://114.55.115.86:8002',
});

// 页面发起的请求路径，通过长度控制pageLoading的显示
const queue = {};

service.interceptors.request.use(
  (config) => {
    // 全局请求loading
    if (Object.keys(queue).length === 0) {
      store.commit('setPageLoading', true);
    }
    const { url } = config;
    queue[url] = url;
    // 不需要token的接口直接返回
    // if(config)
    // 设置token
    config.headers.Authorization = 'Bearer ' + getCookie('token');
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const {
      config: { url },
    } = response;
    delete queue[url];
    if (Object.keys(queue).length === 0) {
      store.commit('setPageLoading', false);
    }
    const { code } = response.data;
    if (code === 200) {
      return response.data;
    } else {
      // http请求200， 业务状态码非200
      // handleError(response);
      return Promise.reject(response);
    }
  },
  (error) => {
    store.commit('setPageLoading', false);
    if (axios.isCancel(error)) {
      return Promise.resolve({
        statusText: '中断请求',
      });
    }
    // http请求非200
    console.log('response error');
    // handleError(error.response);
    return Promise.reject(error.response);
  }
);

const handleError = (response) => {
  const { status } = response;
  switch (status) {
    // 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath },
      });
      break;
    // 403 token过期
    // 登录过期对用户进行提示
    // 清除本地token和清空vuex中token对象
    // 跳转登录页面
    case 403:
      Toast({
        message: '登录过期，请重新登录',
        duration: 2000,
        forbidClick: true,
      });
      // 清除token
      delCookie('token');
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath },
        });
      }, 2000);
      break;
    case 404:
      Toast({
        message: '网络请求不存在',
        duration: 2000,
        forbidClick: true,
      });
      break;
    // 其他错误，直接抛出错误提示
    default:
      Toast({
        message: response.data.msg,
        duration: 3000,
        forbidClick: true,
      });
  }
};

export default service;

export const request = (options) => {
  return service.request(options);
};
