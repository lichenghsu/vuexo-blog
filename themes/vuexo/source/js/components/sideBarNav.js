const { defineComponent, ref, onMounted } = Vue;
const { useRoute, useRouter } = VueRouter;

export default defineComponent({
  name: "SidebarNav",
  setup() {
    const postsByCategory = ref({});
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const res = await fetch("/content.json");
      const data = await res.json();

      const grouped = {};
      data.posts.forEach((post) => {
       const cat = typeof post.categories?.[0]?.name === 'string'
        ? post.categories[0].name
  : '未分類';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(post);
      });

      for (const cat in grouped) {
        grouped[cat].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      }

      postsByCategory.value = grouped;
    });

    return {
      postsByCategory,
      router,
      route
    };
  },
  template: `
    <aside class="w-64 h-screen overflow-y-auto px-4 py-6 text-sm bg-white border-r border-transparent hidden lg:block">
      <div v-for="(posts, category) in postsByCategory" :key="category" class="mb-6">
        <h3 class="text-white dark:text-gray-200 font-semibold mb-2">{{ category }}</h3>
        <ul class="pl-2 space-y-1">
          <li
            v-for="post in posts"
            :key="post.slug"
            @click="router.push('/post/' + post.slug)"
            class="cursor-pointer hover:underline"
            :class="route.params.slug === post.slug
            ? 'font-bold text-blue-500 dark:text-blue-400'
            : 'dark:text-gray-200'"
            >
            {{ post.title }}
        </li>
        </ul>
      </div>
    </aside>
  `,
});
