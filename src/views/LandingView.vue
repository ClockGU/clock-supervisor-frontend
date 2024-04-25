<template>
  <v-row align="center" style="height: 100%">
    <v-col class="d-flex" cols="6" style="justify-content: end">
      <ClockIcon size="600"></ClockIcon>
    </v-col>
    <v-col cols="6">
      <v-card width="600">
        <v-card-text style="text-align: center">
          <h2>Willkommen im Vorgesetztenportal von CLOCK</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-tooltip
            location="bottom"
            :model-value="hasError"
            @update:model-value=""
          >
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="elevated" @click="login">
                Zum Login
              </v-btn>
            </template>
            <span style="color: black"> {{ error }}</span>
          </v-tooltip>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import ClockIcon from "@/components/logo/ClockIcon.vue";
import { useStore } from "vuex";
import ApiService from "@/services/api";
import { computed, ref } from "vue";
const store = useStore();
const error = ref("");

const hasError = computed(() => error.value !== "");
async function login() {
  await store.dispatch("setIsLoading");
  try {
    const response = ApiService.get(
      `/auth/o/authorize/?redirect_uri=${import.meta.env.VITE_PUBLIC_URL}/login`
    );
    const { authorization_url } = response.data;
    window.location = authorization_url;

    setTimeout(() => store.dispatch("unsetLoading"), 5000);
  } catch (e) {
    await store.dispatch("unsetLoading");
    error.value =
      "Ein Fehler ist aufgetreten. Bitte kontaktieren Sie den Support.";
    setTimeout(() => (error.value = ""), 5000);
  }
}
</script>

<style scoped lang="scss">
.v-tooltip :deep(.v-overlay__content) {
  background-color: rgb(var(--v-theme-error));
}
</style>
