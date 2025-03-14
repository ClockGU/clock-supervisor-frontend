<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { mdiCircle, mdiClose, mdiInformationOutline } from "@mdi/js";
import { parseHHmmToMinutes } from "@/parsers/time";
import ApiService from "@/services/api";
import { useStore } from "vuex";
import ViolationComponent from "@/components/ViolationComponent.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const model = defineModel({ type: Boolean });
const props = defineProps({
  date: Date
});
const store = useStore();

const reports = ref([]);

onBeforeMount(async () => (reports.value = await getReports(props.date)));

watch(
  () => props.date,
  async (newValue) => {
    reports.value = await getReports(newValue);
  }
);
watch(
  () => model.value,
  async (newValue) => {
    if (newValue) {
      reports.value = await getReports(props.date);
      model.value = false;
    }
  }
);
const dialog = ref(false);

const ABSCENCE_TYPES = {
  F: "BH",
  K: "S",
  U: "V"
};

function getWorktimeColor(report) {
  const debitWorktime = parseHHmmToMinutes(report.general.debit_worktime);
  const netWorktime = parseHHmmToMinutes(report.general.net_worktime);
  const missingWorktime = debitWorktime - netWorktime;

  if (parseHHmmToMinutes(report.general.next_month_carry_over) >= 0) {
    return "success";
  } else if (missingWorktime <= 0.2 * debitWorktime) {
    return "warning";
  }
  return "error";
}

function getNotesColor(report) {
  let noteCount = 0;
  for (const day in report.days_content) {
    noteCount += report.days_content[day].notes !== "";
  }
  if (noteCount === 0) {
    return "success";
  } else if (noteCount < 6) {
    return "warning";
  } else {
    return "error";
  }
}
async function getReports(dateValue) {
  let response;
  try {
    response = await ApiService.get(
      `/supervisor/reports/${dateValue.getMonth() + 1}/${dateValue.getFullYear()}`
    );
  } catch (e) {
    await store.dispatch("addError", e);
    return [];
  }
  return response.data;
}

function translateAbscence(abscenceType) {
  if (store.getters["locale"] === "en") {
    return ABSCENCE_TYPES[abscenceType];
  }
  return abscenceType;
}
</script>

<template>
  <v-row justify="end">
    <v-col class="d-flex" cols="2">
      <v-dialog
        v-model="dialog"
        location="center"
        content-class="justify-content-center"
      >
        <template #activator="{ props }">
          <button class="icon-center" v-bind="props" style="margin-left: auto">
            <p>{{ t("reporting.legend") }}</p>
            <v-icon class="ml-2" color="grey">{{
              mdiInformationOutline
            }}</v-icon>
          </button>
        </template>
        <v-card width="600">
          <v-toolbar color="white">
            <v-card-title style="width: auto">
              {{ t("reporting.colorCoding") }}
            </v-card-title>
            <v-spacer />
            <v-btn
              variant="plain"
              :icon="mdiClose"
              @click="dialog = !dialog"
            ></v-btn>
          </v-toolbar>
          <v-card-text>
            <p style="margin-bottom: 8px">{{ t("reporting.netWorktime") }}</p>
            <div>
              <div class="icon-center">
                <v-icon color="success">{{ mdiCircle }}</v-icon>
                <p>{{ t("reporting.noUnderhours") }}</p>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="warning">{{ mdiCircle }}</v-icon>
                <p>{{ t("reporting.hasUnderhours") }}</p>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="error">{{ mdiCircle }}</v-icon>
                <p>{{ t("reporting.lessThan20Percent") }}</p>
              </div>
            </div>

            <p style="margin-bottom: 8px; margin-top: 8px">
              {{ t("reporting.violations") }}
            </p>
            <div>
              <div class="icon-center">
                <v-icon color="success">{{ mdiCircle }}</v-icon>
                <span> {{ t("reporting.noViolations") }} </span>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="warning">{{ mdiCircle }}</v-icon>
                <span> {{ t("reporting.lessThan6Violations") }} </span>
              </div>
            </div>
            <div>
              <div class="icon-center">
                <v-icon color="error">{{ mdiCircle }}</v-icon>
                <span> {{ t("reporting.moreThan6Violations") }} </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
  <v-row>
    <v-expansion-panels>
      <v-expansion-panel v-if="reports.length === 0" disabled>
        <v-expansion-panel-title>
          {{ t("reporting.noTimesheetsAvailable") }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ t("reporting.noTimesheetsAvailable") }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel v-for="report in reports" :key="report._id">
        <v-expansion-panel-title>
          <v-row justify="center" no-gutters>
            <v-col cols="6">
              <p>{{ report.general.user_name }}</p>
            </v-col>
            <v-col style="align-content: center" cols="3">
              <div class="d-inline-flex" style="align-items: center">
                <p>{{ t("reporting.netWorktime") }}:</p>
                <v-icon :color="getWorktimeColor(report)">{{
                  mdiCircle
                }}</v-icon>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="d-inline-flex" style="align-items: center">
                <p>{{ t("reporting.violations") }}:</p>
                <v-icon :color="getNotesColor(report)">{{ mdiCircle }}</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              {{ t("reporting.debitWorktime") }}:
              {{ report.general.debit_worktime }}</v-col
            >
            <v-col>
              {{ t("reporting.netWorktime") }}:
              {{ report.general.net_worktime }}</v-col
            >
            <v-col>
              {{ t("reporting.lastMonthCarryOver") }}:
              {{ report.general.last_month_carry_over }}</v-col
            >
            <v-col>
              {{ t("reporting.nextMonthCarryOver") }}:
              {{ report.general.next_month_carry_over }}</v-col
            >
          </v-row>
          <v-row>
            <v-col>
              <v-table>
                <thead>
                  <tr>
                    <th>{{ t("date") }}</th>
                    <th>{{ t("reporting.start") }}</th>
                    <th>{{ t("reporting.end") }}</th>
                    <th>{{ t("reporting.break") }}</th>
                    <th>{{ t("reporting.worktime") }}</th>

                    <th>
                      <v-tooltip location="top">
                        <template #activator="{ props }">
                          <div class="icon-center" v-bind="props">
                            <p>{{ t("reporting.absence") }}</p>
                            <v-icon class="ml-2" color="grey">{{
                              mdiInformationOutline
                            }}</v-icon>
                          </div>
                        </template>
                        <span>{{ t("reporting.absenceTypes") }}</span>
                      </v-tooltip>
                    </th>
                    <th>{{ t("reporting.notes") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(obj, day) in report.days_content"
                    :key="day + report.id"
                  >
                    <td>{{ day }}</td>
                    <td>{{ obj.started }}</td>
                    <td>{{ obj.stopped }}</td>
                    <td>{{ obj.breaktime }}</td>
                    <td>{{ obj.worktime }}</td>
                    <td>{{ translateAbscence(obj.absence_type) }}</td>
                    <td>
                      <span v-if="obj.notes !== ''">
                        <ViolationComponent
                          :key="day + report.id"
                          :violations="obj.notes"
                        ></ViolationComponent>
                      </span>
                    </td>
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
  justify-content: center;
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
