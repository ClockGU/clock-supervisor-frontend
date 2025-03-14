<script setup>
import { mdiClose, mdiCommentQuestion } from "@mdi/js";
import { ref } from "vue";
const dialog = ref(false);
</script>

<template>
  <v-dialog
    v-model="dialog"
    content-class="justify-content-center"
    location="center"
  >
    <template #activator="{ props }">
      <button v-bind="props" style="margin-left: auto; line-height: 21px">
        <span>{{ $t("help") }}</span>
        <v-icon class="ml-2" color="grey">{{ mdiCommentQuestion }} </v-icon>
      </button>
    </template>
    <v-card width="600">
      <v-toolbar color="white">
        <v-card-title style="width: auto">{{
          $t("help-tooltip.title")
        }}</v-card-title>
        <v-spacer />
        <v-btn
          variant="plain"
          :icon="mdiClose"
          @click="dialog = !dialog"
        ></v-btn>
      </v-toolbar>
      <v-card-text style="padding: 0 24px 16px">
        <h3>{{ $t("help-tooltip.question1") }}</h3>
        <span>{{ $t("help-tooltip.answer1") }}</span>
        <h3>{{ $t("help-tooltip.question2") }}</h3>
        <span>{{ $t("help-tooltip.answer2") }}</span>
        <h3>{{ $t("help-tooltip.question3") }}</h3>
        <span>{{ $t("help-tooltip.answer3") }}</span>
        <h3>{{ $t("help-tooltip.question4") }}</h3>
        <span>{{ $t("help-tooltip.answer4") }}</span>
        <h3>{{ $t("help-tooltip.question5") }}</h3>
        <span>{{ $t("help-tooltip.answer4") }}</span>
        <p class="mt-4" style="text-indent: 0">
          <i18n-t keypath="help-tooltip.info">
          <template #link>
            <a href="https://uni-frankfurt.de/clock#supervisor" target="_blank"
              >uni-frankfurt.de/clock</a
            >
          </template>
        </i18n-t>
        </p>
        <h3>
          <p>
            Weitere Informationen:
            <a
              href="https://www.uni-frankfurt.de/f7/clock-zeiterfassung-fur-studentische-hilfskrafte-163850612#a_163850612-47e2c4a3"
              target="_blank"
              >uni-frankfurt.de/clock</a
            >
          </p>
        </h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="css">
:deep(.justify-content-center) {
  flex-direction: row !important;
  justify-content: center;
}
h3:not(:first-of-type) {
  margin-bottom: 8px;
  margin-top: 8px;
}
p {
  text-indent: 8px;
}
</style>
