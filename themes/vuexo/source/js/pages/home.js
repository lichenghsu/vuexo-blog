const { defineComponent, ref, onMounted } = Vue;
const { useRouter } = VueRouter;

export default defineComponent({
  name: "HomePage",
  setup() {
    const router = useRouter();
    const stickyPosts = ref([]);
    const latestPosts = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const goToPost = (slug) => {
      router.push(`/post/${slug}`);
    };

    onMounted(async () => {
      try {
        const res = await fetch("/content.json");
        const data = await res.json();
        const posts = Array.isArray(data) ? data : data.posts || [];

        const valid = posts.filter(
          (p) => p.layout === "post" && p.published !== false,
        );

        stickyPosts.value = valid
          .filter((p) => p.sticky === true)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        const stickySlugs = new Set(stickyPosts.value.map((p) => p.slug));

        latestPosts.value = valid
          .filter((p) => !stickySlugs.has(p.slug))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10);
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      stickyPosts,
      latestPosts,
      loading,
      error,
      goToPost,
    };
  },
  template: `
    <div class="home">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="stickyPosts.length">
          <h2 class="text-lg font-bold mb-2 text-yellow-400">📌 Featured</h2>
          <div v-for="post in stickyPosts" :key="post.slug" class="card" @click="goToPost(post.slug)" style="cursor:pointer;">
            <h2>{{ post.title }}</h2>
            <p>{{ post.date }}</p>
            <p v-html="post.excerpt"></p>
          </div>
        </div>

        <h2 class="text-lg font-bold mb-2 text-blue-400 mt-6">🕒 Latest Posts</h2>
        <div v-for="post in latestPosts" :key="post.slug" class="card" @click="goToPost(post.slug)" style="cursor:pointer;">
          <h2>{{ post.title }}</h2>
          <p>{{ post.date }}</p>
          <p v-html="post.excerpt"></p>
        </div>
      </div>
    </div>
  `,
});
