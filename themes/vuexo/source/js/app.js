const { createApp } = Vue
import router from './router/index.js'
import SiteHeader from './components/header.js'
import SiteFooter from './components/footer.js'

const App = {
  components: {
    SiteHeader,
    SiteFooter
  },
  template: `
    <div>
      <site-header></site-header>
      <router-view></router-view>
      <site-footer></site-footer>
    </div>
  `
}

createApp(App).use(router).mount('#app')

