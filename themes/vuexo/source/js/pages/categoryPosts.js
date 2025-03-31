const { defineComponent, ref, onMounted } = Vue;
const { useRoute, useRouter } = VueRouter;
import PostCard from "../components/postCard.js";

export default defineComponent({
  name: "CategoryPostsPage", // or TagPostsPage
  components: {
    PostCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const posts = ref([]);
    const name = decodeURIComponent(route.params.name);
    const loading = ref(true);
    const error = ref(null);

    const goToPost = (slug) => router.push(`/post/${slug}`);

    onMounted(async () => {
      try {
        const res = await fetch("/content.json");
        const data = await res.json();
        const rawPosts = Array.isArray(data) ? data : data.posts || [];

        posts.value = rawPosts.filter(
          (p) =>
            p.layout === "post" &&
            p.published !== false &&
            p.categories?.some(
              (c) => (typeof c === "string" ? c : c.name) === name,
            ), // or p.tags
        );
      } catch (err) {
        error.value = "Failed to load posts: " + err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      name,
      posts,
      loading,
      error,
      goToPost,
    };
  },
  template: `
    <div class="category-posts">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <h2 class="text-lg font-bold text-blue-400 mb-4">{{ name }}</h2>
        <PostCard v-for="post in posts" :key="post.slug" :post="post" :onClick="goToPost" />
      </div>
    </div>
  `,
});
