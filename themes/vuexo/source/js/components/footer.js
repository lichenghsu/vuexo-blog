const { defineComponent } = Vue

export default defineComponent({
  name: 'SiteFooter',
  template: `
    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} LCXBlog. All rights reserved.</p>
        <p><a href="https://github.com/lichenghsu" target="_blank">GitHub</a></p>
      </div>
    </footer>
  `
})

