import './assets/main.css'


import { createApp } from 'vue'

// @ts-ignore
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import * as echarts from 'echarts'
const app = createApp(App)
app.use(VueCookies)
app.use(router)

app.mount('#app')
