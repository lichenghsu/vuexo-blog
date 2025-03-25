const { createApp } = Vue;
import router from './router/index.js';

const App = {
  template: '<router-view></router-view>'
};

createApp(App).use(router).mount('#app');

