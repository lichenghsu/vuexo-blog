# Vuexo - A Vue-powered SPA Theme for Hexo

Vuexo is a custom Hexo theme built with Vue 3 Composition API and a focus on SPA architecture. Inspired by [solwen.ai](https://solwen.ai/posts/machine-learning), it features a minimalist, modern tech style and complete front-end routing handled by Vue.

## Features

- Built with Vue 3 Composition API
- Custom hash-based SPA routing
- Fully decoupled front-end using Vue components
- Hexo outputs only a minimal HTML shell; all content is handled by Vue
- RESTful-ready structure (Hexo JSON output recommended)
- Clean and modular structure for rapid development
- Minimalist and tech-oriented styling

## Directory Structure

```
vuexo/
├── _config.yml           # Theme configuration
├── layout/
│   └── layout.ejs        # Main HTML template (empty shell)
├── languages/
│   └── default.yml       # Localization file
├── source/
│   ├── css/
│   │   └── style.css     # Global styles
│   └── js/
│       ├── app.js        # Vue app entry point
│       ├── router/
│       │   └── index.js  # SPA routing logic
│       ├── components/
│       │   ├── header.js # Top navigation bar
│       │   └── toc.js    # Right-side Table of Contents
│       │   └── footer.js # Page footer
│       └── pages/
│           ├── home.js
│           ├── post.js
│           ├── categories.js
│           ├── tags.js
│           └── comments.js
```

## Usage

1. Copy this theme folder to your Hexo project's `themes/` directory.
2. In the Hexo root `_config.yml`, set:
```yml
theme: vuexo
```
3. Start the Hexo server:
```hash-based
hexo clean && hexo generate && hexo server
```
4. Vue will take full control of the front-end. Hexo is used for content generation only (JSON output recommended).

License
MIT

