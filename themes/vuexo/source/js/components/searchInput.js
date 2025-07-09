const { defineComponent, ref, watch } = Vue;
const { useRouter } = VueRouter;

export default defineComponent({
  name: "SearchInput",
  props: {
    data: Array,
  },
  setup(props) {
    const router = useRouter();
    const query = ref("");
    const results = ref([]);
    const miniSearch = ref(null);

    watch(
      () => props.data,
      (val) => {
        if (!val || val.length === 0) return;

        miniSearch.value = new MiniSearch({
          idField: "slug",
          fields: ["title", "content"],
          storeFields: ["title", "slug"],
        });

        miniSearch.value.addAll(val);
      },
      { immediate: true }
    );

    watch(query, (newVal) => {
      if (miniSearch.value && newVal.trim().length > 0) {
        results.value = miniSearch.value.search(newVal, {
          prefix: true,
          fuzzy: 0.2,
        });
      } else {
        results.value = [];
      }
    });

    const goTo = (slug) => {
      query.value = "";
      results.value = [];
      router.push(`/post/${slug}`);
    };

    return { query, results, goTo };
  },
  template: `
    <div class="relative">
      <input
        type="text"
        v-model="query"
        placeholder="Search..."
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm bg-white"
      />
      <ul
        v-if="results.length > 0"
        class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow"
      >
        <li
          v-for="r in results"
          :key="r.slug"         
          @click="goTo(r.slug)" 
          class="search-result px-3 py-2 cursor-pointer hover:bg-gray-100"
        >
          {{ r.title }}
        </li>
      </ul>
    </div>
  `,
});


