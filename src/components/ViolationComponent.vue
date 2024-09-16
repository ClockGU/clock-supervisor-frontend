<script setup>
import { mdiInformationOutline } from "@mdi/js";
import { VIOLATIONS } from "@/services/consts";
import { computed, onMounted, ref, useTemplateRef, watchEffect } from "vue";

const componentProps = defineProps({
  violations: { type: String, default: "" }
});
const show = ref(false);
const readableVersions = computed(() => {
  let result = [];
  for (const note of componentProps.violations.split(",")) {
    result.push(VIOLATIONS[note]);
  }
  return result;
});

function onClickOutside() {
  if (show.value) {
    show.value = !show.value;
  }
}
</script>

<template>
  <v-tooltip v-model="show" location="top">
    <template #activator="{ props }">
      <div
        v-click-outside="onClickOutside"
        v-bind="props"
        @click="show = !show"
      >
        <span>{{ componentProps.violations }}</span>
        <sup>
          <v-icon color="grey">{{ mdiInformationOutline }}</v-icon>
        </sup>
      </div>
    </template>
    <p v-for="readable in readableVersions" :key="readable">{{ readable }}</p>
  </v-tooltip>
</template>

<style scoped lang="sass"></style>
