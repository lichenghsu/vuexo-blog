const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
  {
    path: "/",
    component: () => import("../pages/home.js"),
  },
  {
    path: "/post/:slug",
    component: () => import("../pages/post.js"),
  },
  {
    path: "/categories",
    component: () => import("../pages/categories.js"),
  },
  {
    path: "/categories/:name",
    component: () => import("../pages/categoryPosts.js"),
  },
  {
    path: "/tags",
    component: () => import("../pages/tags.js"),
  },
  {
    path: "/tags/:name",
    component: () => import("../pages/tagPosts.js"),
  },
  {
    path: "/comments",
    component: () => import("../pages/comments.js"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: {
      template: "<h1>404 - Page Not Found</h1>",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
