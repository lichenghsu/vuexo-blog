# Vuexo-blog - A Vue-powered SPA Blog for Hexo

![Vuexo logo](./themes/vuexo/source/images/vuexo-logo.svg)

Vuexo-blog is a fully decoupled Hexo theme powered by Vue 3 Composition API. Designed with a minimal and modern tech aesthetic, it transforms your Hexo blog into a Vue SPA, where all content rendering and routing are handled by Vue.

## Features

- Powered by Vue 3 Composition API

- SPA-style hash-based Vue Router

- Fully decoupled front-end with modular Vue components

- Hexo outputs only the base HTML shell + JSON content

- RESTful-ready structure (compatible with hexo-generator-json-content)

- Minimalist, tech-style layout & styling

- TOC, categories, tags, sticky posts, and Giscus comment support

## Directory Structure

```markdown
vuexo-blog/
├── scaffolds/
│ ├── draft.md
│ ├── page.md
│ └── post.md
├── source/
├── themes/
│ └── vuexo/
│ ├── languages/
│ │ └── default.yml
│ ├── layout/
│ │ └── index.ejs
│ ├── source/
│ │ ├── css/
│ │ │ └── style.css
│ │ ├── images/
│ │ │ └── vuexo-logo.svg
│ │ └── js/
│ │ ├── app.js
│ │ ├── router/
│ │ │ └── index.js
│ │ ├── components/
│ │ │ ├── comments.js
│ │ │ ├── footer.js
│ │ │ ├── header.js
│ │ │ └── toc.js
│ │ └── pages/
│ │ ├── categories.js
│ │ ├── categoryPosts.js
│ │ ├── home.js
│ │ ├── post.js
│ │ ├── tagPosts.js
│ │ └── tags.js
├── \_config.yml
├── \_config.markdown-it.yml
├── README.md
├── package.json
└── package-lock.json
```

## Getting Started

1. Clone or copy this theme into your Hexo project:

```bash
cd Vuexo-blog
git clone https://github.com/your-username/vuexo-blog.git themes/vuexo
```

2. Configure your Hexo root \_config.yml:

```yml
theme: vuexo
```

3. Install hexo-generator-json-content:

```bash
npm install hexo-generator-json-content --save
```

4. Start the development server:

```bash
hexo clean && hexo g && hexo s
```

## License

MIT
