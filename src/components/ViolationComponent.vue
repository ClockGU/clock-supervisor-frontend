<script setup>
import { mdiInformationOutline } from "@mdi/js";
import { computed, ref } from "vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const VIOLATIONS = {
  1: () => t('violations.over10'),
  2: () => t('violations.notEnoughBreak'),
  3: () => t('violations.notEnoughRest'),
  4: () => t('violations.after20'),
  5: () => t('violations.before8'),
  6: () => t('violations.onSunday'),
  7: () => t('violations.onHoliday'),
};

const componentProps = defineProps({
  violations: { type: String, default: "" }
});
const show = ref(false);
const readableVersions = computed(() => {
  let result = [];
  for (const note of componentProps.violations.split(",")) {
    result.push(VIOLATIONS[note]());
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
