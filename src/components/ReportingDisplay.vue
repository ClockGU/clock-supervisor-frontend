<script setup>
import { computed, ref, watch } from "vue";
import {mdiCircle} from "@mdi/js";
import {parse} from "date-fns"
import general from "@/store/modules/general";
import {parseHHmmToMinutes} from "@/parsers/time";
const props = defineProps({
  date: Date
});

const reports = computed(() => getReports(props.date));

function getWorktimeColor(report) {
  const debitWorktime = parseHHmmToMinutes(report.general.debit_worktime)
  const netWorktime = parseHHmmToMinutes(report.general.net_worktime)
  const missingWorktime = debitWorktime - netWorktime;

  if (report.general.next_month_carry_over === "00:00") {
    return "success";
  } else if (missingWorktime <= 0.2 * debitWorktime) {
    return "warning"
  }
  return "error"

}

function getReports(dateValue) {
  return [
    {
      _id: "65bbaf6253e29fbe5d12910a",
      days_content: {},
      general: {
        user_name: "Grossmüller, Christian",
        personal_number: "",
        contract_name: "100 beamte",
        month: 1,
        year: 2024,
        long_month_name: "Januar",
        debit_worktime: "01:00",
        total_worked_time: "00:00",
        last_month_carry_over: "00:00",
        next_month_carry_over: "-01:00",
        net_worktime: "00:00"
      }
    }
  ];
}
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="report in reports" :key="report._id">
      <v-expansion-panel-title>
        <v-row justify="center"  no-gutters>
          <v-col cols="6">
            <p>{{ report.general.user_name + " " + "<identifier>" }}</p>
          </v-col>
          <v-col style="align-content: center" cols="3">
            <div class="d-inline-flex" style="align-items: center"> <p>Nettoarbeitszeit:</p><v-icon :color="getWorktimeColor(report)">{{ mdiCircle }}</v-icon></div>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
      </v-expansion-panel-title>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped lang="sass"></style>
