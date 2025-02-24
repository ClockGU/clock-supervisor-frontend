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
        <span>Hilfe</span>
        <v-icon class="ml-2" color="grey">{{ mdiCommentQuestion }} </v-icon>
      </button>
    </template>
    <v-card width="600">
      <v-toolbar color="white">
        <v-card-title style="width: auto"> Was passiert hier? </v-card-title>
        <v-spacer />
        <v-btn
          variant="plain"
          :icon="mdiClose"
          @click="dialog = !dialog"
        ></v-btn>
      </v-toolbar>
      <v-card-text style="padding: 0 24px 16px">
        <h3>Was muss in diesem Bereich getan werden?</h3>
        <p>
          In diesem Bereich müssen Sie die Referenzen auf die Verträge der Ihnen
          zugeordneten Hilfskräfte eintragen.
        </p>
        <h3>Woher kommen diese Referenzen?</h3>
        <p>
          Wenn eine Hilfskraft einen Vertrag in Clock erstellt, so wird eine
          Referenz-ID erzeugt. Diese muss die Hilfskraft Ihnen zukommen lassen
          damit Sie die Arbeitszeitdokumentation einsehen können.
        </p>
        <h3>Was bedeuten diese kryptischen Zeichenketten?</h3>
        <p>
          Die Referenzen werden in Form eines eindeutigen Codes dargestellt und
          verweisen auf einen konkreten Vertrag einer Hilfskraft in Clock.
        </p>
        <h3>Ist eine Zeichenkette valide?</h3>
        <p>
          Mit der Zeit werden sich viele dieser Referenzen ansammeln. Mit dem
          Button "Gültigkeit Prüfen" können Sie herausfinden, ob diese
          Referenzen noch gültig sind.
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
