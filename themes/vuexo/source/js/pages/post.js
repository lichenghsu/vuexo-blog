const { defineComponent, watch, ref, onMounted, watchEffect, onBeforeUnmount, nextTick } =
  Vue;
const { useRoute } = VueRouter;
import Comments from "../components/comments.js";
import { BASE_URL } from "../utils/baseUrl.js";

function addLanguageLabels() {
  document.querySelectorAll('pre[data-language]').forEach(pre => {
    if (pre.dataset.hasLangLabel) return;

    const lang = pre.dataset.language;
    const label = document.createElement('div');
    label.className = 'code-lang-label';
    label.textContent = lang.trim().toLowerCase();

    pre.style.position = 'relative';
    pre.appendChild(label);
    pre.dataset.hasLangLabel = 'true';
  });
}

function enhanceYoutubeLinks() {
  const links = document.querySelectorAll('a[href*="youtu"]');

  links.forEach(link => {
    const url = new URL(link.href);
    const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();

    if (videoId) {
      const preview = document.createElement('div');
      preview.className = 'youtube-preview mt-2';
      preview.innerHTML = `
        <a href="${link.href}" target="_blank" rel="noopener">
          <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="YouTube Preview" class="rounded shadow">
        </a>
      `;
      link.parentNode.insertBefore(preview, link.nextSibling);
    }
  });
}

function setGiscusTheme(theme) {
  if (location.hostname !== "lichenghsu.github.io") return;

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
  name: "PostPage",
  components: { Comments },
  setup() {
    const route = useRoute();
    const post = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const defaultTitle = document.title;

    const fetchPost = async (slug) => {
      loading.value = true;
      try {
        const res = await fetch(BASE_URL + "/content.json");
        const data = await res.json();
        const posts = Array.isArray(data) ? data : data.posts || [];
        const found = posts.find((p) => p.slug === slug);
        if (!found) throw new Error("Post not found");
        post.value = found;
        error.value = null;
      } catch (err) {
        error.value = err.message;
        post.value = null;
      } finally {
        loading.value = false;
        setupGiscusThemeObserver();
        nextTick(() => {
        if (window.Prism) {
          Prism.highlightAll();
          addLanguageLabels();
        }});
      }
    };

    const setupGiscusThemeObserver = () => {
      const observer = new MutationObserver(() => {
        const iframe = document.querySelector("iframe.giscus-frame");
        if (iframe) {
          const theme = localStorage.getItem("theme") || "light";
          const giscusTheme = theme === "dark" ? "dark_dimmed" : "light";
          setGiscusTheme(giscusTheme);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    onMounted(() => {
      fetchPost(route.params.slug);
      watchEffect(() => {
        if (post.value?.content) {
          nextTick(() => {
            addLanguageLabels();
            enhanceYoutubeLinks()
          });
        }
      });
    });
    watch(
      () => route.params.slug,
      async (newSlug) => {
        await fetchPost(newSlug);
      }
    );

    watchEffect(() => {
      if (post.value?.title) {
        document.title = `${post.value.title} | Vuexo`;
        nextTick(() => {
          if (window.Prism) {
            Prism.highlightAll();
          }
        });
      }
    });

    onBeforeUnmount(() => {
      document.title = defaultTitle;
    });

    return {
      post,
      loading,
      error,
    };
  },

  template: `
    <div v-if="post" class="post">
      <div class="post-content prose dark:prose-invert max-w-none">
        <h1 class="text-3xl text-gray-700 font-bold">{{ post.title }}</h1>
        <p class="text-sm text-gray-700 mb-4">{{ post.date }}</p>
        <div class="text-gray-700" v-html="post.content"></div>
        <Comments />
      </div>
    </div>
  `,
});
