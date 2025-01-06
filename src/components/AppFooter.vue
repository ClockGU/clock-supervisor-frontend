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
              &copy; 2016-{{ new Date().getFullYear() }} 
              <span class="d-none d-sm-inline-block">Vuetify, LLC</span> —
              <a
                href="https://vuetifyjs.com/about/licensing/"
                rel="noopener noreferrer"
                target="_blank"
              >
                MIT License
              </a>
            </div>
            <div v-else-if="content === 1" class="my-2">
              <p>
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
            <div v-else class="my-4">
              <a
                v-for="item in items"
                :key="item.title"
                :href="item.href"
                :title="item.title"
                class="d-inline-block mx-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                <v-icon
                  color="white"
                  :icon="item.icon"
                  size="30"
                />
              </a>
            </div>
          </div>

        </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { 
  mdiGithub, 
  mdiReddit, 
  mdiShieldStarOutline, 
} from '@mdi/js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const links = [
  { text: "Datenschutz", to: "https://clock.uni-frankfurt.de/privacy" },
  { text: "Impressum", to: "https://clock.uni-frankfurt.de/impressum" }
]
const items = [ 
  { 
    title: 'Vuetify Documentation', 
    icon: '$vuetify',  // This might need adjustment based on how you want to render it. 
    href: 'https://vuetifyjs.com/', 
  }, 
  { 
    title: 'Vuetify Support', 
    icon: mdiShieldStarOutline, 
    href: 'https://support.vuetifyjs.com/', 
  }, 
  { 
    title: 'Vuetify X', 
    icon: `svg:M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z`, 
    href: 'https://x.com/vuetifyjs', 
  }, 
  { 
    title: 'Vuetify GitHub', 
    icon: mdiGithub, 
    href: 'https://github.com/vuetifyjs/vuetify', 
  },    
  { 
    title: 'Vuetify Reddit', 
    icon: mdiReddit, 
    href: 'https://reddit.com/r/vuetifyjs', 
  },  
  
]
const route = useRoute()
const showFooter = computed(() => route.path === "/main")
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #B5007F;
  }
</style>


