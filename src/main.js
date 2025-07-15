// import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

createApp(App).mount('#app')
