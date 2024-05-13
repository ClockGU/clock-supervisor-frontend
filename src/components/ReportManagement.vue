<script setup>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { mdiClose } from "@mdi/js";

const store = useStore();
const managedReferences = ref(store.getters.user.supervised_objects);
const icons = reactive({ closeIcon: mdiClose });
async function removeReference(reference) {
  setElementBlur();
}
function setElementBlur() {
  setTimeout(() => document.activeElement.blur(), 200);
}
</script>

<template>
  <v-card style="width: 100%">
    <v-card-text>
      <p class="mb-4">Für folgende Verträge zuständig:</p>
      <v-text-field
        :autofocus="false"
        class="normal-cursor"
        style="caret-color: transparent"
        @click.prevent="setElementBlur"
      >
        <v-chip
          v-for="reference in managedReferences"
          :key="reference"
          closable
        >
          {{ reference }}
          <template #close>
            <v-icon
              :icon="icons.closeIcon"
              @click.stop="removeReference(reference)"
            />
          </template>
        </v-chip>
      </v-text-field>
      <v-text-field> </v-text-field>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="sass">
@import "vuetify/dist/_component-variables.sass"

.v-text-field :deep(.v-field)
  cursor: default !important

:deep(input)
  cursor: default !important

.chip-btn
  height: $chip-font-size
  width: $chip-font-size

.v-chip :deep(.v-icon)
  height: $chip-font-size
  width: $chip-font-size
</style>
