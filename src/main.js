// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify CSS
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // (Optional) Material Design Icons
import '@mdi/font/css/materialdesignicons.css'; // Ensure you have mdi icons installed

const pinia = createPinia()
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Use Material Design Icons
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
app.use(pinia)
app.use(vuetify);
app.mount('#app');
