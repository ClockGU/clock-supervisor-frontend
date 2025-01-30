<template>
  <v-app>
    <v-main style="background-color: rgb(var(--v-theme-primary))">
      <v-container class="pt-0 pb-0" style="height: 100%; max-width: 1400px">
        <router-view />
      </v-container>
      <LoadingOverlay />
    </v-main>
  </v-app>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";  
import i18n from "./plugins/i18n";
const store = useStore();  

// Load the locale from localStorage on app initialization  

onMounted(() => {
  const savedLocale = localStorage.getItem("userLocale");  
  if (savedLocale) {  
    store.dispatch("changeLocale", savedLocale);  
  }  
  try{
    if (store.getters.isLoggedIn) {  
      const {data}=store.dispatch("GET_USER"); 
      i18n.locale = data.language || "de"; 
  }
  }catch(error){
    console.log(error);
  }
  
})

</script>
