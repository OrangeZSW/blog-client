import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from "axios";
import vuetify from './plugins/vuetify'

import VMdEditor from "@/plugins/VMdEditor";

import clipboard from 'clipboard'

import VueEasyLightbox from 'vue-easy-lightbox'

// 方法 1. 使用 Vue.use
Vue.use(VueEasyLightbox)

// 方法 2. 通过 Vue.component 注册
Vue.component(VueEasyLightbox.name, VueEasyLightbox)

Vue.prototype.clipboard = clipboard;

Vue.config.productionTip = false

Vue.use(ElementUI);


Vue.use(VMdEditor);

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
