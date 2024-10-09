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
          In diesem Bereich tragen sie die Vertragsreferenzen der Ihnen
          untergeordneten Hilfskräfte ein.
        </p>
        <h3>Was bedeuten diese kryptischen Zeichenketten?</h3>
        <p>
          Die Zeichenketten sind Referenzen zu den Verträgen Ihrer Hilfskräfte
          in Clock.
        </p>
        <h3>Woher kommen diese Zeichenketten?</h3>
        <p>
          Erstellt eine Hilfskraft einen Vertrag in Clock so wird eine
          Zeichenkette erstellt. Diese Muss die Hilfskraft Ihnen zukommen lassen
          und Sie müssen sie sich hier zuordnen.
        </p>
        <h3>
          Was ist wenn ich mir nicht sicher bin ob eine Zeichenkette valide ist?
        </h3>
        <p>
          Sollten sich mit der Zeit viele dieser Referenzen ansammeln, können
          Sie mittels des Buttons "Gültigkeit Prüfen" überprüfen, ob diese
          Referenzen noch gültig sind.
        </p>
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
