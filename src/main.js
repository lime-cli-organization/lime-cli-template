// polifill
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 清空样式
import './styles/reset.css';
// svg组件
import './icons/index.js';
// day.js
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;
// html2pdf
import html2pdf from '@/utils/html2pdf';
Vue.use(html2pdf);
// 指令
import '@/directive/index';

Vue.config.productionTip = false;
import { Button, Icon, Loading, Overlay, RadioGroup, Radio, Cell, PullRefresh, List } from 'vant';
Vue.use(Button).use(Icon).use(Loading).use(Overlay).use(RadioGroup).use(Radio).use(Cell).use(PullRefresh).use(List);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
