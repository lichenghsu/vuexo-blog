const { createApp } = Vue;
import router from "./router/index.js";
import SiteHeader from "./components/header.js";
import SiteFooter from "./components/footer.js";
import TableOfContents from "./components/toc.js";
import SideBarNav from "./components/sideBarNav.js";

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
    SideBarNav
  },
   template: `
      <div class="min-h-screen flex flex-col">
        <site-header />

        <div class="flex flex-1 overflow-hidden">
          <aside class="w-64 overflow-y-auto shrink-0 border-transparent tran lg:block">
            <side-bar-nav />
          </aside>

          <div class="flex-1 flex flex-col overflow-y-auto">
            <div class="px-4 py-6 flex-1">
              <table-of-contents />
              <main>
                <router-view />
              </main>
            </div>

            <site-footer />
          </div>
        </div>
      </div>
  `,
}

createApp(App).use(router).mount("#app");
