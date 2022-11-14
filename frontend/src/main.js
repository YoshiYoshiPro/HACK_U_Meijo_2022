import { createApp } from 'vue'
import ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

createApp(App).use(store).use(router).mount('#app')
