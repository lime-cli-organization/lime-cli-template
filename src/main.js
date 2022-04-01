import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 清空样式
import './styles/reset.css';

Vue.config.productionTip = false;
import { Button, Icon } from 'vant';
Vue.use(Button).use(Icon);

import '@/directive/index';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
