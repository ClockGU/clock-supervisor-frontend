<script setup>
import { mdiInformationOutline } from "@mdi/js";
import { VIOLATIONS } from "@/services/consts";
import { computed } from "vue";

const componentProps = defineProps({
  violations: { type: String, default: "" }
});
const readableVersions = computed(() => {
  let result = [];
  for (const note of componentProps.violations.split(",")) {
    result.push(VIOLATIONS[note]);
  }
  return result;
});
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <div v-bind="props">
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
