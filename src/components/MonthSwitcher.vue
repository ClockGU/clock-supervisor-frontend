<script setup>
import { computed, reactive } from "vue";
import { addMonths, subMonths, format } from "date-fns";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
const icons = reactive({
  prev: mdiChevronLeft,
  next: mdiChevronRight
});
const model = defineModel({ type: Date });
function goPrev() {
  model.value = subMonths(model.value, 1);
}
function goNext() {
  model.value = addMonths(model.value, 1);
}

const formattedDate = computed(() => {
  return format(model.value, "MMMM yyyy");
});
</script>

<template>
  <div>
    <v-btn variant="text" icon @click="goPrev">
      <v-icon>{{ icons.prev }}</v-icon></v-btn
    >
    <span>
      {{ formattedDate }}
    </span>
    <v-btn variant="text" icon @click="goNext"
      ><v-icon>{{ icons.next }}</v-icon></v-btn
    >
  </div>
</template>

<style scoped lang="sass"></style>
