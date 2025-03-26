const { defineComponent, ref, onMounted } = Vue;
const { useRoute, useRouter } = VueRouter;

export default defineComponent({
  name: "TagPostsPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const posts = ref([]);
    const tagName = decodeURIComponent(route.params.name);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const res = await fetch("/content.json");
        const data = await res.json();
        const rawPosts = Array.isArray(data) ? data : data.posts || [];

        posts.value = rawPosts.filter(
          (post) =>
            post.layout === "post" &&
            post.published !== false &&
            post.tags?.some(
              (t) => (typeof t === "string" ? t : t.name) === tagName,
            ),
        );
      } catch (err) {
        error.value = "Failed to load tag posts: " + err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToPost = (slug) => router.push(`/post/${slug}`);

    return {
      tagName,
      posts,
      loading,
      error,
      goToPost,
    };
  },

  template: `
  <div class="tag-posts">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2 class="text-lg font-bold text-pink-400 mb-4">{{ tagName }}</h2>
      <div v-for="post in posts" :key="post.slug" class="card" @click="goToPost(post.slug)" style="cursor: pointer;">
        <h2>{{ post.title }}</h2>
        <p>{{ post.date }}</p>
        <p v-html="post.excerpt"></p>
      </div>
    </div>
  </div>
`,
});
