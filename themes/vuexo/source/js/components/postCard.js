import post from "../pages/post.js";
import { BASE_URL } from "../utils/baseUrl.js";

const { defineComponent } = Vue;

export default defineComponent({
  name: "PostCard",
  props: {
    post: Object,
    onClick: Function,
  },
  computed: {
    coverUrl() {
      if (!this.post?.cover) return null;
      const path = this.post.cover.replace(/^\/+/, "");
      return `${BASE_URL}${path}`;
    },
  },
  template: `
    <div class="card text-black dark:bg-gray-800" @click="onClick(post.slug)" style="cursor:pointer;">
      <img
        v-if="coverUrl"
        :src="coverUrl"
        alt="cover"
        class="card-cover"
      />
      <div class="card-body">
        <h2 class="text-gray-900 text-xl font-bold">{{ post.title }}</h2>
        <p>{{ post.date }}</p>
        <p v-html="post.excerpt"></p>
      </div>
    </div>
  `,
});
