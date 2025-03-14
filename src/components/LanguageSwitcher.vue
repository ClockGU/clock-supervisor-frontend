<template>
  <v-menu
    location="bottom left"
    offset-y
    max-height="calc(100% - 16px)"
    transition="slide-y-transition"
  >
    <template #activator="{ props }">
      <v-btn class="text-capitalize" variant="text" v-bind="props">
        <v-icon :start="smAndUp" :icon="icons.mdiTranslate" />
        <span
          class="text-subtitle-1 text-capitalize font-weight-light hidden-xs-and-down"
          v-text="selectedLocale"
        />
        <v-icon class="hidden-sm-and-down" :icon="icons.mdiChevronDown" end />
      </v-btn>
    </template>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in locales"
        :key="item.locale"
        @click="switchLocale(item.locale)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref, computed } from "vue";
import { mdiChevronDown, mdiTranslate } from "@mdi/js";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";
import i18n from "@/plugins/i18n";
import ApiService from "@/services/api";

const { smAndUp } = useDisplay();
const store = useStore();

const icons = { mdiChevronDown, mdiTranslate };
const locales = ref([
  { name: "Deutsch", locale: "de" },
  { name: "English", locale: "en" }
]);

const selectedLocale = computed(() => {
  const currentLocale = i18n.global.locale.value;
  const match = locales.value.find((item) => item.locale === currentLocale);
  return match ? match.name : locales.value[0].name;
});

const switchLocale = async (newLocale) => {
  if (i18n.global.locale.value === newLocale) return;
  await ApiService.setHeader("Accept-Language", newLocale);
  localStorage.setItem("locale", newLocale);
  try {
    await ApiService.patch("/auth/users/me/", {
      language: newLocale
    });
  } catch (error) {
    console.error("Error changing locale:", error);
  }
  store.dispatch("changeLocale", newLocale);
};
</script>
