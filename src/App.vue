<template>
  <v-app>
    <v-main style="background-color: rgb(var(--v-theme-primary))">
      <v-container style="height: 100%">
        <router-view />
      </v-container>
      <v-overlay :model-value="store.getters.isLoading" persistent> </v-overlay>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
