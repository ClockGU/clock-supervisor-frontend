/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ContentView from "@/views/ContentView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/main", component: ContentView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
