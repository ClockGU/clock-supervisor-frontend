<script setup>
import { computed, reactive, ref } from "vue";
import { addMonths, subMonths, format } from "date-fns";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
const icons = reactive({
  prev: mdiChevronLeft,
  next: mdiChevronRight
});
const date = ref(new Date());
date.value.setDate(1);
function goPrev() {
  date.value = subMonths(date.value, 1);
}
function goNext() {
  date.value = addMonths(date.value, 1);
}

const formattedDate = computed(() => {
  return format(date.value, "MMMM yyyy");
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
