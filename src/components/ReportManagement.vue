<script setup>
import { useStore } from "vuex";
import { ref, reactive, watch } from "vue";
import { mdiClose,  } from "@mdi/js";
import { REFERENCE_FIELD_NAME } from "@/main";
import ApiService from "@/services/api";
import HelpDialog from "@/components/HelpDialog.vue";
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';


const store = useStore();
const managedReferences = ref(store.getters.user.supervised_references);
const newReference = ref("");
const loadingAdd = ref(false);
const loadingRemove = ref(false);
const icons = reactive({ closeIcon: mdiClose });


const emit = defineEmits(["refetchReports"]);
const rules = [
  () => {
    if(newReference.value==="")returntrue
    return validateRules();
  },
];
function validateRules(){
  if (!isValidUUIDv4(newReference.value) )
      return "Ungültige Referenz-ID: Bitte verwenden Sie ein gültiges UUIDv4-Format.";

    if (managedReferences.value.includes(newReference.value)) {
      return "Diese Referenz existiert bereits.";
    }

}
function isValidUUIDv4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

async function addReference() {
  loadingAdd.value = true;
  let data = {};
  if (validateRules()) return;
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
      $t("references.errors.addReferenceError")
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
      $t("references.errors.removeReferenceError")
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
      $t("references.errors.checkValidityError")
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
      <div class="d-flex mb-3 " style="width: 100%">
        <span class="icon-center">{{ $t('references.newReferenceLabel') }}:</span>
        <HelpDialog></HelpDialog>
      </div>
      <div class="d-flex align-center mb-3">
        <v-text-field
          v-model="newReference"
          class="mr-3"
          :label="$t('references.newReferenceLabel')"
          :rules="rules"
          @keydown.enter="addReference"
        >
          <template #append-inner>
            <v-progress-circular
              v-if="loadingAdd"
              color="primary"
              indeterminate
            />
          </template>
        </v-text-field>
        <v-btn
          :disabled="newReference === ''"
          class="ml-3"
          style="transform: translate(0px, -12px)"
          @click="addReference"
          >{{ $t("add") }}</v-btn
        >
      </div>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            {{ managedReferences.length + " " + $t("references.managedReferences") }}
          </v-expansion-panel-title>
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
                  />
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
              >
                {{ $t("references.checkValidityButton") }}
              </v-btn>
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



