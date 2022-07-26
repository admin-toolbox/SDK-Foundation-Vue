import { createRouter, createWebHistory } from "vue-router";

const router = new createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    { path: "/", component: () => import("/pages/front-page.vue") },

    //General Contact
    { path: "/contact/", component: () => import("/pages/contact-page.vue") },

    // Not found
    {
      path: "/:catchAll(.*)",
      component: () => import("/pages/error-404.vue"),
    },
  ],
});

export default router;
