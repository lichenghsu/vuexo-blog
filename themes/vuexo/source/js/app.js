const { createApp } = Vue;
import router from "./router/index.js";
import SiteHeader from "./components/header.js";
import SiteFooter from "./components/footer.js";
import TableOfContents from "./components/toc.js";

const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}


const App = {
  components: {
    SiteHeader,
    SiteFooter,
    TableOfContents,
  },
   template: `
    <div>
      <site-header></site-header>
      <div class="app-container">
        <table-of-contents />
        <main class="flex-1">
          <router-view></router-view>
        </main>
      </div>
      <site-footer></site-footer>
    </div>
  `,
};

createApp(App).use(router).mount("#app");
