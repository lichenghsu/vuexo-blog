const { defineComponent, ref, onMounted, onBeforeUnmount, watch, nextTick } =
  Vue;
const { useRoute } = VueRouter;

export default defineComponent({
  name: "TableOfContents",
  setup() {
    const tocItems = ref([]);
    const activeId = ref(null);
    const route = useRoute();
    let observer = null;

    const generateTOC = () => {
      const headings = document.querySelectorAll(
        "article h1, article h2, article h3",
      );
      const items = [];

      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = heading.textContent
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
        }

        items.push({
          text: heading.textContent,
          id: heading.id,
          level: parseInt(heading.tagName[1]),
        });
      });

      tocItems.value = items;
    };

    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: "smooth",
        });
      }
    };

    const setupObserver = () => {
      if (observer) observer.disconnect();

      const options = {
        root: null,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id;
          }
        });
      }, options);

      tocItems.value.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    };

    const rebuild = () => {
      nextTick(() => {
        generateTOC();
        setupObserver();
      });
    };
    watch(
      () => route.fullPath,
      () => {
        setTimeout(() => {
          nextTick(() => {
            generateTOC();
            setupObserver();
          });
        }, 300);
      },
    );
    onMounted(() => {
      setTimeout(() => {
        nextTick(() => {
          generateTOC();
          setupObserver();
        });
      }, 300);
    });
    onBeforeUnmount(() => {
      if (observer) observer.disconnect();
    });

    return {
      tocItems,
      activeId,
      scrollTo,
    };
  },
  template: `
    <div class="toc">
            <div class="toc-inner" v-if="tocItems.length">
        <ul>
          <li
            v-for="item in tocItems"
            :key="item.id"
            :class="['toc-h' + item.level, { active: activeId === item.id }]"
          >
            <a href="#" @click.prevent="scrollTo(item.id)">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
});
