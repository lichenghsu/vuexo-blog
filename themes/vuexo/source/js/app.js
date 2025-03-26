const { createApp } = Vue;
import router from "./router/index.js";
import SiteHeader from "./components/header.js";
import SiteFooter from "./components/footer.js";
import TableOfContents from "./components/toc.js";

const App = {
  components: {
    SiteHeader,
    SiteFooter,
    TableOfContents,
  },
  template: `
    <div>
      <site-header></site-header>
      <router-view></router-view>
      <site-footer></site-footer>
      <table-of-contents />
    </div>
  `,
};

createApp(App).use(router).mount("#app");
