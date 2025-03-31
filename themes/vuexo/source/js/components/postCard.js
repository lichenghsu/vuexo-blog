const { defineComponent } = Vue;

export default defineComponent({
  name: "PostCard",
  props: {
    post: Object,
    onClick: Function,
  },
  template: `
    <div class="card" @click="onClick(post.slug)" style="cursor:pointer;">
      <img
        v-if="post.cover"
        :src="post.cover"
        alt="cover"
        class="card-cover"
      />
      <div class="card-body">
        <h2>{{ post.title }}</h2>
        <p>{{ post.date }}</p>
        <p v-html="post.excerpt"></p>
      </div>
    </div>
  `,
});
