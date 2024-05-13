<script setup>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { mdiClose } from "@mdi/js";

const store = useStore();
const managedReferences = ref(store.getters.user.supervised_objects);
const newReference = ref("");
const loadingAdd = ref(false);
const loadingRemove = ref(false);
const icons = reactive({ closeIcon: mdiClose });
async function removeReference(reference) {
  setElementBlur();
}
function setElementBlur() {
  setTimeout(() => document.activeElement.blur(), 200);
}

function addReference() {}
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
        <template #append-inner>
          <v-progress-circular
            v-if="loadingRemove"
            color="primary"
            indeterminate
          >
          </v-progress-circular>
        </template>
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
      <div class="d-flex align-center">
        <v-text-field
          v-model="newReference"
          class="mr-3"
          label="Neues Object zuordnen"
        >
          <template #append-innner>
            <v-progress-circular
              v-if="loadingAdd"
              color="primary"
              indeterminate
            >
            </v-progress-circular>
          </template>
        </v-text-field>
        <v-btn
          class="ml-3"
          style="transform: translate(0px, -12px)"
          @click="addReference"
          >Hinzufügen</v-btn
        >
      </div>
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
