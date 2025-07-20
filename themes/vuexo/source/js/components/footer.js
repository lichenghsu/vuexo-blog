const { defineComponent, ref, watchEffect } = Vue;

export default defineComponent({
  name: 'SiteFooter',
  setup() {
    const logoUrl = ref("");

    const updateLogo = () => {
      const isDark = document.documentElement.classList.contains("dark");
      logoUrl.value = `images/${isDark ? "cover.png" : "vuexo-logo.svg"}`;
    };

    updateLogo();

    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return {
      logoUrl,
      currentYear: new Date().getFullYear()
    };
  },
  template: `
    <footer class="site-footer bg-white text-black dark:bg-gray-800 dark:text-white">
      <div class="footer-inner text-center">
        <a href="https://github.com/lichenghsu/vuexo-blog" target="_blank" class="block mb-3">
         <img
          :src="logoUrl"
          alt="Vuexo Logo"
          class="mx-auto mb-3 w-12 h-12"
         />
        </a>
        <p>© {{ currentYear }} Vuexo. All rights reserved.</p>
        <p><a href="https://github.com/lichenghsu" target="_blank">My GitHub Page</a></p>
        <p>
          Powered by 
          <a href="https://hexo.io/" class="text-blue-500 hover:underline" target="_blank">Hexo</a> 
          and 
          <a href="https://vuejs.org/" class="text-green-400 hover:underline" target="_blank">Vue</a>.
        </p> 
      </div>
    </footer>
  `
});
