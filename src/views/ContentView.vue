<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col class="d-flex" cols="6">
      <v-card>
        <h1>SUCCESS MAIN PAGE!!</h1>
        <p>User Data</p>
        <p>{{ store.getters.user }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
