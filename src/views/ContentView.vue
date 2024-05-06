<script setup>
import { useStore } from "vuex";
import AdminToolbar from "@/components/AdminToolbar.vue";
import MonthSwitcher from "@/components/MonthSwitcher.vue";
import ReportManagement from "@/components/ReportManagement.vue";
import ReportingDisplay from "@/components/ReportingDisplay.vue";

const store = useStore();
</script>

<template>
  <v-row justify="center" style="height: 100%">
    <v-col class="d-flex" cols="12">
      <v-sheet style="width: 100%; height: 100%">
        <AdminToolbar></AdminToolbar>
        <MonthSwitcher></MonthSwitcher>
        <ReportManagement></ReportManagement>
        <ReportingDisplay></ReportingDisplay>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
