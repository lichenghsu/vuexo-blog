const { defineComponent, ref, onMounted } = Vue
const { useRoute } = VueRouter

export default defineComponent({
  name: 'PostPage',
  setup() {
    const route = useRoute()
    const post = ref(null)
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      try {
        const res = await fetch('/content.json')
        const data = await res.json()

        const posts = Array.isArray(data) ? data : (data.posts || [])

        const found = posts.find(p => p.slug === route.params.slug)

        if (!found) {
          throw new Error('Post not found')
        }

        post.value = found
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    })

    return {
      post,
      loading,
      error
    }
  },
  template: `
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <h1>{{ post.title }}</h1>
      <p>{{ post.date }}</p>
      <div v-html="post.content"></div>
    </div>
  `
})

