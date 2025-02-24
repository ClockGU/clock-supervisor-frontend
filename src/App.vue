<template>
  <v-app>
    <v-main style="background-color: rgb(var(--v-theme-primary))">
      <v-container class="pt-0 pb-0" style="height: 100%; max-width: 1400px">
        <router-view />
      </v-container>
      <LoadingOverlay />
    </v-main>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import AppFooter from "./components/AppFooter.vue";
</script>
