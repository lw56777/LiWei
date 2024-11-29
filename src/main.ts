import { createApp } from 'vue';
import 'virtual:uno.css';
import './styles/common.css';
import './styles/var.scss';
import './styles/iconfont.css';
import './styles/animations.scss';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './utils/skills.js';
import './utils/app.js';
import ElementPlus from 'element-plus';
import router from './router';
import App from './App.vue';

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app');