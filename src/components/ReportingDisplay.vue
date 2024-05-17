<script setup>
import { computed, ref, watch } from "vue";
import {mdiCircle, mdiClose, mdiInformationOutline} from "@mdi/js";
import {parseHHmmToMinutes} from "@/parsers/time";
const props = defineProps({
  date: Date
});

const reports = computed(() => getReports(props.date));
const dialog = ref(false);
function getWorktimeColor(report) {
  const debitWorktime = parseHHmmToMinutes(report.general.debit_worktime)
  const netWorktime = parseHHmmToMinutes(report.general.net_worktime)
  const missingWorktime = debitWorktime - netWorktime;

  if (report.general.next_month_carry_over === "00:00") {
    return "success";
  } else if (missingWorktime <= 0.2 * debitWorktime) {
    return "warning";
  }
  return "error";

}

function getNotesColor(report) {
  let noteCount =  0;
  for (const day in report.days_content) {
    noteCount += report.days_content[day].notes !== ""
  }
  if (noteCount === 0){
    return "success";
  } else if (noteCount < 6) {
    return "warning";
  } else {
    return "error";
  }
}
function getReports(dateValue) {
  return [
    // {
    //   _id: "65bbaf6253e29fbe5d12910a",
    //   days_content: {},
    //   general: {
    //     user_name: "Grossmüller, Christian",
    //     personal_number: "",
    //     contract_name: "100 beamte",
    //     month: 1,
    //     year: 2024,
    //     long_month_name: "Januar",
    //     debit_worktime: "01:00",
    //     total_worked_time: "00:00",
    //     last_month_carry_over: "00:00",
    //     next_month_carry_over: "-01:00",
    //     net_worktime: "00:00"
    //   }
    // },
    {'days_content':
        {
          '02.05.2024': {'started': '10:00', 'stopped': '14:00', 'break_time': '00:00', 'work_time': '04:00', 'absence_type': '', 'type': 'Schicht', 'notes': ''},
          '06.05.2024': {'started': '09:00', 'stopped': '12:00', 'break_time': '00:00', 'work_time': '03:00', 'absence_type': '', 'type': 'Schicht', 'notes': ''},
          '07.05.2024': {'started': '18:00', 'stopped': '22:00', 'break_time': '00:00', 'work_time': '04:00', 'absence_type': '', 'type': 'Schicht', 'notes': '4'},
          '12.05.2024': {'started': '10:00', 'stopped': '12:00', 'break_time': '00:00', 'work_time': '02:00', 'absence_type': '', 'type': 'Schicht', 'notes': '6'},
          '15.05.2024': {'started': '14:00', 'stopped': '18:00', 'break_time': '00:00', 'work_time': '04:00', 'absence_type': '', 'type': 'Schicht', 'notes': ''}
        },
      'general':
        {
          'user_name': 'Grossmüller, Christian',
          'personal_number': null,
          'contract_name': '22',
          'month': 5,
          'year': 2024,
          'long_month_name': 'Mai',
          'debit_worktime': '22:00',
          'total_worked_time': '17:00',
          'last_month_carry_over': '00:00',
          'next_month_carry_over': '-05:00',
          'net_worktime': '17:00'
        }
    }
  ];
}
</script>

<template>
  <v-row justify="end">
    <v-col>
      <v-dialog v-model="dialog" location="center" content-class="justify-content-center">
        <template #activator="{ props }">
          <button class="icon-center" v-bind="props">
            <p>Legende </p> <v-icon class="ml-2" color="grey">{{ mdiInformationOutline }}</v-icon>
          </button>
        </template>
        <v-card width="600">
          <v-toolbar color="white">
            <v-card-title style="width: auto;">
              Farbkodierung
            </v-card-title>
            <v-spacer/>
            <v-btn variant="plain" :icon="mdiClose" @click="dialog = !dialog"></v-btn>
          </v-toolbar>
          <v-card-text>
            <p style="margin-bottom: 8px;">Nettoarbeitszeit</p>
            <div>
              <div class="icon-center">
                <v-icon color="success">{{ mdiCircle }}</v-icon>
                <p> Keine Unterstunden </p>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="warning">{{ mdiCircle }}</v-icon>
                <p> Hat Unterstunden </p>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="error">{{ mdiCircle }}</v-icon>
                <p> Weniger als 20% Sollarbeitszeit </p>
              </div>
            </div>

            <p style="margin-bottom: 8px; margin-top: 8px">Verstöße</p>
            <div>
              <div class="icon-center">
                <v-icon color="success">{{ mdiCircle }}</v-icon>
                <span> Keine Verstöße </span>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="warning">{{ mdiCircle }}</v-icon>
                <span> Weniger als 6 Verstöße </span>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="error">{{ mdiCircle }}</v-icon>
                <span> Mehr als 6 Verstöße </span>
              </div>
            </div>

          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
  <v-row>
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
            <v-col cols="3">
              <div class="d-inline-flex" style="align-items: center"> <p>Verstöße:</p><v-icon :color="getNotesColor(report)">{{ mdiCircle }}</v-icon></div>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
              <v-col> Sollarbeitsziet: {{report.general.debit_worktime}}</v-col>
              <v-col> Nettoarbeitszeit: {{report.general.net_worktime }}</v-col>
              <v-col> Übertrag aus Vormonat: {{ report.general.last_month_carry_over }}</v-col>
              <v-col> Übertrag: {{ report.general.next_month_carry_over }}</v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-table >
                <thead>
                <tr>
                  <th> Datum</th>
                  <th> Start</th>
                  <th> Ende</th>
                  <th> Puse</th>
                  <th> Arbeitszeit</th>

                  <th>
                    <v-tooltip location="top">
                      <template #activator="{ props }">
                        <div class="icon-center" v-bind="props">
                          <p> F/K/U </p>
                          <v-icon class="ml-2" color="grey">{{ mdiInformationOutline }}</v-icon>
                        </div>
                      </template>
                      <span>F: Feiertag, K: Krank, U: Urlaub</span>
                    </v-tooltip>
                  </th>
                  <th> Notizen</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(obj, day) in report.days_content" :key="day + report.id">
                  <td>{{ day }}</td>
                  <td>{{ obj.started }}</td>
                  <td>{{ obj.stopped }}</td>
                  <td>{{ obj.break_time }}</td>
                  <td>{{ obj.work_time }}</td>
                  <td>{{ obj.absence_type }}</td>
                  <td>{{ obj.notes }}</td>
                </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<style scoped lang="css">
:deep(.justify-content-center) {
  flex-direction: row !important;
  justify-content: center
}
.v-card-text > div {
  display: block;
}
.icon-center {
  display: inline-flex;
  align-items: center;
}
.v-tooltip :deep(.v-overlay__content) {
  background: rgb(var(--v-theme-primary-lighten-2));
}
</style>
