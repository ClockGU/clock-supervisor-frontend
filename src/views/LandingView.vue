<template>
  <v-row align="center" style="height: 100%">
    <v-col class="d-flex" cols="6" style="justify-content: end">
      <ClockIcon size="600"></ClockIcon>
    </v-col>
    <v-col cols="6">
      <v-card width="600">
        <v-card-text style="text-align: center">
          <h2>Willkommen im Vorgesetztenportal von CLOCK</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer><v-btn variant="elevated"> Zum Login </v-btn
          ><v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import ClockIcon from "@/components/logo/ClockIcon.vue";
</script>

<style scoped lang="sass"></style>
