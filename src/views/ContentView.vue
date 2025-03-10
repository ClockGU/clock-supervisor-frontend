<script setup>
import { useStore } from "vuex";
import AdminToolbar from "@/components/AdminToolbar.vue";
import MonthSwitcher from "@/components/MonthSwitcher.vue";
import ReportManagement from "@/components/ReportManagement.vue";
import ReportingDisplay from "@/components/ReportingDisplay.vue";
import { ref } from "vue";
import { subMonths } from "date-fns";

const store = useStore();

const viewDate = ref(subMonths(new Date(), 1));
const refetechReports = ref(false);
viewDate.value.setDate(1);
</script>

<template>
  <v-sheet style="width: 100%; height: 100%">
    <AdminToolbar></AdminToolbar>
    <v-container style="max-width: 1400px">
      <v-row>
        <v-col>
          <ReportManagement
            @refetch-reports="refetechReports = true"
          ></ReportManagement>
        </v-col>
      </v-row>
      <v-row justify="center">
        <MonthSwitcher v-model="viewDate"></MonthSwitcher>
      </v-row>
      <v-row>
        <v-col>
          <ReportingDisplay
            v-model="refetechReports"
            :date="viewDate"
          ></ReportingDisplay>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped lang="sass"></style>
