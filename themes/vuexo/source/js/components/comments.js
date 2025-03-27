const { defineComponent, onMounted, watch } = Vue;
const { useRoute } = VueRouter;

export default defineComponent({
  name: "GiscusComments",
  setup() {
    const route = useRoute();

    const loadGiscus = () => {
      const container = document.getElementById("giscus-container");
      if (!container) return;

      // clean all scripts and comments
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "lichenghsu/vuexo-comment");
      script.setAttribute("data-repo-id", "R_kgDOOPkBhw");
      script.setAttribute("data-category", "General");
      script.setAttribute("data-category-id", "DIC_kwDOOPkBh84Cogg9");
      script.setAttribute("data-mapping", "title"); // when online switch to "pathname"
      script.setAttribute("data-strict", "0");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-theme", "preferred_color_scheme");
      script.setAttribute("data-lang", "zh-TW");
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;

      container.appendChild(script);

      const giscusKey = ref(0);
      watch(
        () => route.fullPath,
        () => {
          giscusKey.value++; // let template re-render giscus container
        },
      );
    };
    onMounted(() => {
      loadGiscus();
    });

    watch(
      () => route.fullPath,
      () => {
        loadGiscus();
      },
    );
  },
  template: `
  <div :key="giscusKey" id="giscus-container" style="margin-top: 2rem;"></div>
  `,
});
