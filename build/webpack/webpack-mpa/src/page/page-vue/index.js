import 'lib-flexible';
// import flexible from 'lib-flexible/flexible.js';


import Vue from 'vue'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './index.vue';


Vue.use(Element, {
  size: 'medium', // set element-ui default size
})


new Vue({
  el: '#app',
  render: h => h(App)
})

