import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 清空样式
import './styles/reset.css';

Vue.config.productionTip = false;
import { Button, Icon, Loading, Overlay, RadioGroup, Radio } from 'vant';
Vue.use(Button).use(Icon).use(Loading).use(Overlay).use(RadioGroup).use(Radio);

import '@/directive/index';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
