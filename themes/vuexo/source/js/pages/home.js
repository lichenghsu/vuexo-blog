const { defineComponent, ref, onMounted } = Vue
const { useRouter } = VueRouter

export default defineComponent({
  name: 'HomePage',
  setup() {
    const posts = ref([])
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()


onMounted(async () => {
  try {
    const res = await fetch('/content.json')
    const data = await res.json()
    console.log('[DEBUG] content.json raw data:', data)

    const rawPosts = Array.isArray(data) ? data : (data.posts || [])
    console.log('[DEBUG] rawPosts:', rawPosts)

    posts.value = rawPosts
      .filter(p => p.layout === 'post')
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    console.log('[DEBUG] filtered posts:', posts.value)
  } catch (err) {
    error.value = 'Failed to load posts: ' + err.message
    console.error('[ERROR]', err)
  } finally {
    loading.value = false
  }
})

    const goToPost = (slug) => {
      router.push(`/post/${slug}`)
    }

    return {
      posts,
      loading,
      error,
      goToPost
    }
  },
  template: `
    <div class="post-list">
      <div v-if="loading">Loading posts...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="post in posts" :key="post.slug" class="post-item" @click="goToPost(post.slug)" style="cursor: pointer; margin-bottom: 2rem;">
          <h2>{{ post.title }}</h2>
          <p style="color: gray;">{{ post.date }}</p>
          <p>{{ post.excerpt || (post.content && post.content.slice(0, 100) + '...') }}</p>
        </div>
      </div>
    </div>
  `
})

