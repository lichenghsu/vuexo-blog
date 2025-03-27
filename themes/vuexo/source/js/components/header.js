const { defineComponent, ref } = Vue;
const { RouterLink } = VueRouter;

export default defineComponent({
  name: "SiteHeader",
  components: { RouterLink },
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return { menuOpen, toggleMenu };
  },
  template: `
    <header class="site-header">
      <div class="container">
        <div class="logo" @click="$router.push('/')">Vuexo</div>
        <div class="burger" @click="toggleMenu">☰</div>
        <nav class="nav" :class="{ open: menuOpen }">
          <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
          <RouterLink to="/categories" @click="menuOpen = false">Categories</RouterLink>
          <RouterLink to="/tags" @click="menuOpen = false">Tags</RouterLink>
          <RouterLink to="/page/about" @click="menuOpen = false">About</RouterLink>
        </nav>
      </div>
    </header>
  `,
});
