<template>
  <v-footer v-if="showFooter" color="primary-darken-2" style="padding: 0; margin: 0; min-height: 72px;">
    <v-row justify="center" no-gutters>
        <v-col class="text-center d-flex align-center justify-center flex-column">
          <div class="d-flex align-center justify-center ga-6 my-2">
            <a
              v-for="link in links"
              :key="link.text"
              :href="link.to"
              color="white"
            >
              <v-btn color="white" variant="text" rounded>{{ link.text }}</v-btn>
            </a>
          </div>

          <div v-for="content in [0, 1, 2]" :key="content">
            <div v-if="content === 0" class="my-2">
              &copy;{{ new Date().getFullYear() }} 
              <a
                href="https://uni-frankfurt.de/clock"
                rel="noopener noreferrer"
                target="_blank"
              >
                Clock
              </a>
            </div>
            <div v-else-if="content === 1" class="my-2 pb-10">
              <p class="mb-2">
                Dieses Projekt wurde mit finanzieller Unterstützung der
                <a
                  class="text-no-wrap"
                  href="https://www.uni-frankfurt.de/"
                >
                  Goethe-Universität Frankfurt
                </a>
                entwickelt.
              </p>
              <p>
                Code auf
                <a
                  class="text-no-wrap"
                  href="https://github.com/ClockGU"
                >
                  Github
                </a>
                ansehen.
              </p>
            </div>
          </div>
        </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const links = [
  { text: "Datenschutz", to: "https://clock.uni-frankfurt.de/privacy" },
  { text: "Impressum", to: "https://clock.uni-frankfurt.de/impressum" }
]

const route = useRoute()
const showFooter = computed(() => route.path !== "/" && route.path !== "/login")
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #EA80FC

    ;
  }
</style>


