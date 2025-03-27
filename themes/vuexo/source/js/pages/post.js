const { defineComponent, ref, onMounted, watchEffect } = Vue;
const { onBeforeUnmount } = Vue;
const { useRoute } = VueRouter;
import Comments from "../components/comments.js";

export default defineComponent({
  name: "PostPage",
  components: {
    Comments,
  },
  setup() {
    const route = useRoute();
    const post = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const defaultTitle = document.title;

    onMounted(async () => {
      try {
        const res = await fetch("/content.json");
        const data = await res.json();
        const posts = Array.isArray(data) ? data : data.posts || [];

        const found = posts.find((p) => p.slug === route.params.slug);
        if (!found) throw new Error("Post not found");

        post.value = found;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    watchEffect(() => {
      if (post.value?.title) {
        document.title = `${post.value.title} | Vuexo`;
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
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
      <Comments />
    </div>
  `,
});
