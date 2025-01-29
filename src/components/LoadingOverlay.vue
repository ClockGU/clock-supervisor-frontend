<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <v-overlay :model-value="store.getters.isLoading" persistent>
    <v-container>
      <v-row justify="center">
        <v-col class="text-center">
          <v-progress-circular
            size="200"
            width="24"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card v-if="store.getters.globalErrors.length !== 0">
            <v-card-title style="color: rgb(var(--v-theme-error))">
              {{$t('errors.error Occured')}}
            </v-card-title>
            <v-card-text>
              <ul>
                <li v-for="(error, i) in store.getters.globalErrors" :key="i">
                  {{ error }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<style scoped lang="sass">
.v-overlay
  justify-content: center
  align-items: center

.v-overlay__scrim
  position: absolute
</style>




