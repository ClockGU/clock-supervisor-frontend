<script setup>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { mdiClose, mdiCommentQuestion } from "@mdi/js";
import { REFERENCE_FIELD_NAME } from "@/main";
import ApiService from "@/services/api";
import HelpDialog from "@/components/HelpDialog.vue";
const store = useStore();
const managedReferences = ref(store.getters.user.supervised_references);
const newReference = ref("");
const loadingAdd = ref(false);
const loadingRemove = ref(false);
const icons = reactive({ closeIcon: mdiClose });
const dialog = ref(false);

const emit = defineEmits(["refetchReports"]);
async function addReference() {
  let data = {};
  loadingAdd.value = true;
  setElementBlur();
  try {
    await store.dispatch("addSupervisedReference", newReference.value);
    data[REFERENCE_FIELD_NAME] = managedReferences.value;
    const response = await ApiService.patch("/auth/users/me/", data);
    emit("refetchReports");
  } catch (e) {
    await store.dispatch("popSupervisedReference", newReference.value);
    await store.dispatch(
      "addError",
      "Ein Fehler beim hinzufügen eines Objekts ist aufgetreten."
    );
    return;
  }
  newReference.value = "";
  loadingAdd.value = false;
}
async function removeReference(reference) {
  let data = {};
  loadingRemove.value = true;
  setElementBlur();
  try {
    await store.dispatch("popSupervisedReference", reference);
    data[REFERENCE_FIELD_NAME] = managedReferences.value;
    const response = await ApiService.patch("/auth/users/me/", data);
    emit("refetchReports");
  } catch (e) {
    await store.dispatch("addSupervisedReference", reference);
    await store.dispatch(
      "addError",
      "Ein Fehler beim entfernen eines Objekts ist aufgetreten."
    );
  }
  loadingRemove.value = false;
}

async function checkValidity() {
  let response;
  try {
    response = await ApiService.post(
      "/supervisor/references/validate",
      managedReferences.value
    );
  } catch (e) {
    await store.dispatch(
      "addError",
      "Ein Fehler beim Überprüfen der Validität der Referenzen ist aufgetreten."
    );
    return;
  }
  console.log(response.data);
  await store.dispatch("setSupervisedReferences", response.data);
}

// Workaround for Textfield. The "active" state upon clicking looks weird if it is not reset
function setElementBlur() {
  setTimeout(() => document.activeElement.blur(), 200);
}
</script>

<template>
  <v-card style="width: 100%">
    <v-card-text>
      <div class="d-flex mb-3" style="width: 100%">
        <span class="icon-center">Hilfskraft-Verträge verwalten:</span>
        <HelpDialog></HelpDialog>
      </div>
      <div class="d-flex align-center">
        <v-text-field
          v-model="newReference"
          class="mr-3"
          label="Neuen Hilfskraft-Vertrag zuordnen"
          @keydown.enter="addReference"
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
          :disabled="newReference === ''"
          class="ml-3"
          style="transform: translate(0px, -12px)"
          @click="addReference"
          >Hinzufügen</v-btn
        >
      </div>
      <v-expansion-panels
        ><v-expansion-panel>
          <v-expansion-panel-title>
            {{
              managedReferences.length + " Hilfskraft-Verträge zugeordnet"
            }}</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <div class="d-flex align-center">
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
                      @click.prevent="removeReference(reference)"
                    />
                  </template>
                </v-chip>
              </v-text-field>
              <v-btn
                class="ml-3"
                style="transform: translate(0px, -12px)"
                @click="checkValidity"
                >Gültigkeit Prüfen</v-btn
              >
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
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

.icon-center
  display: inline-flex
  align-items: center
</style>
