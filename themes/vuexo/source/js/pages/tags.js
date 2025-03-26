const { defineComponent, ref, onMounted } = Vue;
const { useRouter } = VueRouter;

export default defineComponent({
  name: "TagsPage",
  setup() {
    const router = useRouter();
    const tags = ref({});
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const res = await fetch("/content.json");
        const data = await res.json();
        const posts = Array.isArray(data) ? data : data.posts || [];

        const validPosts = posts.filter(
          (p) =>
            p.layout === "post" &&
            p.published !== false &&
            Array.isArray(p.tags),
        );

        const grouped = {};
        validPosts.forEach((post) => {
          post.tags.forEach((tag) => {
            const name = typeof tag === "string" ? tag : tag.name;
            if (!grouped[name]) grouped[name] = [];
            grouped[name].push(post);
          });
        });

        tags.value = grouped;
      } catch (err) {
        error.value = "Failed to load tags: " + err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToTag = (tag) => {
      const encoded = encodeURIComponent(tag);
      router.push(`/tags/${encoded}`);
    };

    const goToPost = (slug) => {
      router.push(`/post/${slug}`);
    };

    return {
      tags,
      loading,
      error,
      goToPost,
      goToTag,
    };
  },
  template: `
    <div class="tags">
      <div v-if="loading">Loading tags...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="(posts, tag) in tags" :key="tag" class="card">
          <h2 @click="goToTag(tag)" style="cursor: pointer;">{{ tag }}</h2>
          <ul style="margin-top: 0.5rem;">
            <div v-for="post in posts" :key="post.slug" @click="goToPost(post.slug)" style="cursor: pointer;">
              <span class="hover:underline">{{ post.title }}</span>
              <small style="margin-left: 0.5rem; color: #888;">({{ post.date }})</small>
            </div>
          </ul>
        </div>
      </div>
    </div>
    `,
});
