import SearchInput from "./searchInput.js";

const { defineComponent, ref, onMounted } = Vue;
const { RouterLink } = VueRouter;


function setGiscusTheme(theme) {
  
  const allowedHosts = ["lcxlab.com", "www.lcxlab.com"];
  if (!allowedHosts.includes(location.hostname)) return;

  const tryPostMessage = () => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return false;

    const iframeOrigin = new URL(iframe.src).origin;
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: { theme },
        },
      },
      iframeOrigin
    );
    return true;
  };

  if (!tryPostMessage()) {
    const interval = setInterval(() => {
      if (tryPostMessage()) clearInterval(interval);
    }, 500);
  }
}



export default defineComponent({
  name: "SiteHeader",
  components: { RouterLink, SearchInput },
  setup() {
    const menuOpen = ref(false);
    const isDark = ref(false);
    const posts = ref([]);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const toggleTheme = () => {
      isDark.value = !isDark.value;
      const theme = isDark.value ? "dark_dimmed" : "light";
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark.value);
      setGiscusTheme(theme);
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem("theme");
      const defaultToDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const effectiveTheme = savedTheme || (defaultToDark ? "dark" : "light");

      isDark.value = effectiveTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark.value);
      localStorage.setItem("theme", effectiveTheme);

      const giscusTheme = isDark.value ? "dark_dimmed" : "light";
      setGiscusTheme(giscusTheme);

      (async () => {
        try {
          const res = await fetch("/content.json");
          const data = await res.json();
          posts.value = data.posts || data;
        } catch (err) {
          console.error("❌ Failed to load posts:", err);
        }
      })();
    });

    return { menuOpen, toggleMenu, toggleTheme, isDark, posts };
  },
  template: `
    <header class="site-header bg-white dark:bg-gray-800 text-black shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="logo text-xl font-bold cursor-pointer" @click="$router.push('/')">LCX_lab</div>

          <SearchInput :data="posts" class="hidden md:block w-64 mx-4" />

        <div class="hidden md:flex gap-6 items-center flex-1 justify-end">
          <RouterLink to="/">首頁</RouterLink>
          <RouterLink to="/categories">類別</RouterLink>
          <RouterLink to="/tags">標籤</RouterLink>
          <RouterLink to="/about">關於我</RouterLink>

          <div
            class="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300"
            @click="toggleTheme"
          >
            <div
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
              :class="{ 'translate-x-6': isDark }"
            >
              <span class="text-xs">
                {{ isDark ? '🌙' : '☀️' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 漢堡選單按鈕（小螢幕顯示） -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-2xl">☰</button>
        </div>
      </div>

      <!-- 漢堡展開選單 -->
      <div v-if="menuOpen" class="md:hidden hidden-content bg-white px-4 pb-4">
        <RouterLink to="/" class="block py-2" @click="menuOpen = false">首頁</RouterLink>
        <RouterLink to="/categories" class="block py-2" @click="menuOpen = false">類別</RouterLink>
        <RouterLink to="/tags" class="block py-2" @click="menuOpen = false">標籤</RouterLink>
        <RouterLink to="/about" class="block py-2" @click="menuOpen = false">關於作者</RouterLink>
        <div
          class="w-14 h-8 mt-2 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300"
          @click="toggleTheme"
        >
          <div
            class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
            :class="{ 'translate-x-6': isDark }"
          >
            <span class="text-xs">
              {{ isDark ? '🌙' : '☀️' }}
            </span>
          </div>
        </div>
      </div>
    </header>
  `,
});
