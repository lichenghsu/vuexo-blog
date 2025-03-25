const { defineComponent, ref, onMounted } = Vue
const { useRoute } = VueRouter

export default defineComponent({
  name: 'PostPage',
  setup() {
    const route = useRoute()
    const post = ref(null)

    onMounted(async () => {
  const res = await fetch('/api/posts.json')
  const text = await res.text()
  console.log('[DEBUG] raw response:', text)  
      try {
    const data = JSON.parse(text)
    post.value = data.find(p => p.slug === route.params.slug)
  } catch (err) {
    console.error('解析 JSON 發生錯誤', err)
  }
})
    return {
      post
    }
  },
  template: `
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.date }}</p>
      <div v-html="post.content"></div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  `
})

