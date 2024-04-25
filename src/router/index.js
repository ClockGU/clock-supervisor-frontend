/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ContentView from "@/views/ContentView.vue";
import LandingView from "@/views/LandingView.vue";

const routes = [
  { path: "/", component: LandingView },
  { path: "/login", component: LoginView },
  { path: "/main", component: ContentView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
