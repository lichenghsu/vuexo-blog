const { defineComponent } = Vue
const { RouterLink } = VueRouter

export default defineComponent({
  name: 'SiteHeader',
  components: { RouterLink },
  template: `
    <header class="site-header">
      <div class="container">
        <div class="logo" @click="$router.push('/')">MyTechBlog</div>
        <nav class="nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/tags">Tags</RouterLink>
          <RouterLink to="/page/about">About</RouterLink>
        </nav>
      </div>
    </header>
  `
})

