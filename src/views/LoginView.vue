<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col class="d-flex" cols="6">
      <v-card>
        <h1>SUCCESS LOGIN PAGE!!</h1>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/services/api";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await store.dispatch("setIsLoading");
  const { code } = route.query;
  // Replace the history entry to remove the auth code form the browser address bar
  window.history.replaceState({}, null, "/");
  try {
    const response = await ApiService.post("/supervisor/auth/o/token/", {
      code
    });
    await store.dispatch("login", response.data);
  } catch {
    // TODO: Specific Error handling
    await store.dispatch("logout");
    await router.push("/");
    await store.dispatch("unsetLoading");
  }
  try {
    const response = await ApiService.get("/auth/users/me/");
    await store.dispatch("setUser", response.data);
  } catch {
    // TODO: Specific Error handling
    await store.dispatch("logout");
    await router.push("/");
    await store.dispatch("unsetLoading");
  }
  await router.push("/main");
  await store.dispatch("unsetLoading");
});
</script>

<style scoped lang="sass"></style>
