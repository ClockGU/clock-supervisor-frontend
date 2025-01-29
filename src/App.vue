<template>
  <v-app>
    <v-main style="background-color: rgb(var(--v-theme-primary))">
      <v-container class="pt-0 pb-0" style="height: 100%; max-width: 1400px">
        <router-view />
      </v-container>
      <LoadingOverlay />
    </v-main>
  </v-app>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";

/*
//todo
async created() {
    await this.$store.dispatch("changeLocale", this.locale);
    if (!this.isLoggedIn) return;
    try {
      const { data } = await this.$store.dispatch("GET_USER");
      this.$i18n.locale = data.language || "de";
    } catch (error) {
      log(error);
    }
  },
  */
</script>
