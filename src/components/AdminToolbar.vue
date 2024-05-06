<template>
  <v-toolbar>
    <v-toolbar-title>
      {{ firstLetter + "." }}
      {{ store.getters.user.last_name }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn @click="logout"> Logout</v-btn>
  </v-toolbar>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let firstLetter = ref(store.getters.user.first_name.charAt(0));

async function logout() {
  await store.dispatch("setIsLoading");
  await store.dispatch("logout");
  await router.push("/");
  await store.dispatch("unsetLoading");
}
</script>

<style scoped lang="sass"></style>
