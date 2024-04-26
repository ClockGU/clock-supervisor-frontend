<template>
  <v-app>
    <v-main style="background-color: rgb(var(--v-theme-primary))">
      <v-container style="height: 100%">
        <router-view />
      </v-container>
      <LoadingOveray />
    </v-main>
  </v-app>
</template>

<script setup>
import LoadingOveray from "@/components/LoadingOveray.vue";
</script>
