import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 清空样式
import './styles/reset.css';
// 变量样式
import './styles/variable.less';

Vue.config.productionTip = false;
import { Button, Icon, Loading, Overlay, RadioGroup, Radio, Cell } from 'vant';
Vue.use(Button).use(Icon).use(Loading).use(Overlay).use(RadioGroup).use(Radio).use(Cell);

import '@/directive/index';

import html2pdf from '@/utils/html2pdf';
Vue.use(html2pdf);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
