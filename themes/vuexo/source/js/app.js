const { createApp } = Vue
import router from './router/index.js'
import SiteHeader from './components/header.js'

const App = {
  components: {
    SiteHeader
  },
  template: `
    <div>
      <site-header></site-header>
      <router-view></router-view>
    </div>
  `
}

createApp(App).use(router).mount('#app')

