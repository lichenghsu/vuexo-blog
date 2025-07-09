const { defineComponent, onMounted, watch, ref } = Vue;
const { useRoute } = VueRouter;

export default defineComponent({
  name: "GiscusComments",
  setup() {
    const route = useRoute();
    const giscusKey = ref(0);

    const loadGiscus = () => {
      const container = document.getElementById("giscus-container");
      if (!container) return;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const theme = document.documentElement.classList.contains("dark")
        ? "dark_dimmed"
        : "light";

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "lichenghsu/vuexo-comment");
      script.setAttribute("data-repo-id", "R_kgDOOPkBhw");
      script.setAttribute("data-category", "General");
      script.setAttribute("data-category-id", "DIC_kwDOOPkBh84Cogg9");
      script.setAttribute("data-mapping", "title"); // or pathname
      script.setAttribute("data-strict", "0");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-lang", "zh-TW");
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;

      container.appendChild(script);
    };

    onMounted(() => {
      loadGiscus();

      function reloadGiscusWithTheme() {
        const container = document.getElementById("giscus-container");
        if (!container) return;

        const theme = document.documentElement.classList.contains("dark")
          ? "dark_dimmed"
          : "light";

        const tryPostMessage = () => {
          const iframe = container.querySelector("iframe.giscus-frame");
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
          let elapsed = 0;
          const maxWait = 5000;
          const interval = setInterval(() => {
            elapsed += 500;
            if (tryPostMessage() || elapsed >= maxWait) {
              clearInterval(interval);
            }
          }, 500);
        }
      }

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            reloadGiscusWithTheme();
          }
        }
      });

      observer.observe(document.documentElement, { attributes: true });
    });

    watch(
      () => route.fullPath,
      () => {
        giscusKey.value++;
        setTimeout(() => loadGiscus(), 100);
      }
    );

    return {
      giscusKey,
    };
  },

  template: `
    <div :key="giscusKey" id="giscus-container" style="margin-top: 2rem;"></div>
  `,
});
