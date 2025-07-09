const { defineComponent, ref, onMounted } = Vue;
const { useRouter } = VueRouter;
import { BASE_URL } from "../utils/baseUrl.js";

export default defineComponent({
  name: "CategoriesPage",
  setup() {
    const router = useRouter();
    const categories = ref({});
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const res = await fetch(BASE_URL + "/content.json");
        const data = await res.json();
        const posts = Array.isArray(data) ? data : data.posts || [];

        const validPosts = posts.filter(
          (p) =>
            p.layout === "post" &&
            p.published !== false &&
            Array.isArray(p.categories),
        );

        const grouped = {};
        validPosts.forEach((post) => {
          post.categories.forEach((cat) => {
            const name = typeof cat === "string" ? cat : cat.name;
            if (!grouped[name]) grouped[name] = [];
            grouped[name].push(post);
          });
        });

        categories.value = grouped;
      } catch (err) {
        error.value = "Failed to load categories: " + err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToCategory = (name) => {
      const encoded = encodeURIComponent(name);
      router.push(`/categories/${encoded}`);
    };

    const goToPost = (slug) => {
      router.push(`/post/${slug}`);
    };

    return {
      categories,
      loading,
      error,
      goToPost,
      goToCategory,
    };
  },
  template: `
    <div class="categories">
      <div v-if="loading">Loading categories...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="(posts, cat) in categories" :key="cat" class="card" @click="goToCategory(cat)" style="cursor: pointer;">
          <h2>{{ cat }}</h2>
          <p>{{ posts.length }} posts</p>
        </div>
      </div>
    </div>
  `,
});
