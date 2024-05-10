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
  <div
    style="
      min-width: 300px;
      min-height: 50px;
      display: flex;
      justify-content: center;
    "
  >
    <v-btn
      class="justify-center"
      variant="text"
      :icon="icons.prev"
      @click="goPrev"
    >
    </v-btn>
    <v-spacer />
    <span style="align-self: center">
      {{ formattedDate }}
    </span>
    <v-spacer />
    <v-btn variant="text" :icon="icons.next" @click="goNext"></v-btn>
  </div>
</template>

<style scoped lang="sass"></style>
