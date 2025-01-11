import { createApp } from 'vue'
import './assets/styles/main.styl'

// 引入 Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
