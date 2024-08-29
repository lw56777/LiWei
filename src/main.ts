import { createApp } from 'vue';
import 'virtual:uno.css';
import './styles/common.css';
import './styles/var.scss';
import './styles/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './utils/iconfont.js';
import ElementPlus from 'element-plus';
import router from './router';
import App from './App.vue';

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app');