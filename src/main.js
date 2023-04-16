import { createApp } from 'vue'
import {router} from './router/index.js'
import reqFunAxios from '../req/req'
import App from './App.vue'
import helperAxios from 'axios'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
const AppNew=createApp(App)
AppNew.use(router)
AppNew.use(ElementPlus);
AppNew.config.globalProperties.$reqFunAxios=reqFunAxios
AppNew.config.globalProperties.$helperAxios=helperAxios
AppNew.mount('#app')