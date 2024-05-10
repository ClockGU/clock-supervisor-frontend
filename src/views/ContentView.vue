<script setup>
import { useStore } from "vuex";
import AdminToolbar from "@/components/AdminToolbar.vue";
import MonthSwitcher from "@/components/MonthSwitcher.vue";
import ReportManagement from "@/components/ReportManagement.vue";
import ReportingDisplay from "@/components/ReportingDisplay.vue";
import { ref } from "vue";

const store = useStore();

const viewDate = ref(new Date());
viewDate.value.setDate(1);
</script>

<template>
  <v-row justify="center" style="height: 100%">
    <v-col class="d-flex" cols="12">
      <v-sheet style="width: 100%; height: 100%">
        <AdminToolbar></AdminToolbar>
        <div class="pa-4">
          <v-row justify="center">
            <MonthSwitcher v-model="viewDate"></MonthSwitcher>
          </v-row>
          <ReportManagement></ReportManagement>
          <ReportingDisplay></ReportingDisplay>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
