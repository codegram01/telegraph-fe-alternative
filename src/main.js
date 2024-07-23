import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initStore } from "@/store"

const init = async () => {
    await initStore();

    const app = createApp(App)
    
    app.use(router)
    
    app.mount('#app')
}

init()