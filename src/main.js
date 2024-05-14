import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import registerGlobals from '@/components/global/global';

const app = createApp(App);
app.use(router);
app.use(store)
app.mount('#app');

registerGlobals(app);

export default app;
