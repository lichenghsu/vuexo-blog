const { createApp } = Vue;
import router from "./router/index.js";
import SiteHeader from "./components/header.js";
import SiteFooter from "./components/footer.js";
import TableOfContents from "./components/toc.js";
import SideBarNav from "./components/sideBarNav.js";
import BackToTop from "./components/backToTop.js";

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
    SideBarNav,
    BackToTop
  },
   template: `
      <div class="min-h-screen flex flex-col">
        <site-header />

        <div class="flex flex-1">
          <back-to-top />

          <!-- Sidebar -->
          <aside class="sticky top-0 h-screen w-64 overflow-y-auto shrink-0 border-transparent block lg:block bg-red-100 hidden">
            <side-bar-nav />
          </aside>

          <!-- Main Content -->
          <div class="flex-1 flex flex-col overflow-y-auto">
            <div class="px-4 py-6 flex-1">
              <table-of-contents />
              <main class="flex-1 overflow-y-auto">
                <router-view />
              </main>
            </div>
          </div>
        </div>
            <site-footer />
      </div>
  `,
}

createApp(App).use(router).mount("#app");
