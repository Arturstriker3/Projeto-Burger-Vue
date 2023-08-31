import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Novo
import store from "./store"

//Antigo createApp(App).use(router).mount('#app')

const app = createApp(App).use(store)
app.use(router)
app.use(store)
app.mount('#app')

