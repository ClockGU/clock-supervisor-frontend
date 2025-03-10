<template>
  <v-row align="center" justify="center" style="height: 100%">
    <v-col class="d-flex justify-center" cols="12">
      <v-card>
        <v-card-title> {{ t("authentication.title") }} </v-card-title>
        <v-card-text>
          <p>
            {{ t("authentication.text") }}
          </p>
          <p class="mt-3">
            {{ t("authentication.help") }}
            <a href="mailto:clock-kontakt@dlist.server.uni-frankfurt.de"
              >Support</a
            >
          </p>
          <v-textarea
            v-model="token"
            :label="t('authentication.fieldLabel')"
            :placeholder="t('authentication.placeholder')"
          >
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="logout">Logout</v-btn>
          <v-spacer />
          <v-btn @click="submit"> Absenden </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/services/api";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const token = ref("");

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

async function logout() {
  await store.dispatch("setIsLoading");
  await store.dispatch("logout");
  await router.push("/");
  await store.dispatch("unsetLoading");
}
async function submit() {
  await store.dispatch("setIsLoading");
  let response;
  try {
    response = await ApiService.post("/supervisor/verify/", {
      auth_key: token.value
    });
  } catch (e) {
    for (const error of e.response.data) {
      await store.dispatch("addError", error);
    }
    setTimeout(async () => {
      await store.dispatch("unsetErrorLoading");
    }, 10000);
    return;
  }
  await store.dispatch("setUser", response.data);
  await router.push("/main");
  await store.dispatch("unsetLoading");
}

onMounted(async () => {
  await store.dispatch("setIsLoading");
  const { code } = route.query;
  // Replace the history entry to remove the auth code form the browser address bar
  window.history.replaceState({}, null, "/");
  try {
    const response = await ApiService.post("/supervisor/auth/o/token/", {
      code
    });
    await store.dispatch("login", response.data);
  } catch {
    await store.dispatch(
      "addError",
      "Ein Problem ist aufgetreten (Code=TokenTransactionFromBackend). Bitte Kontaktieren sie den Support."
    );
    await store.dispatch("logout");
    setTimeout(async () => {
      await router.push("/");
      await store.dispatch("unsetErrorLoading");
    }, 10000);
    return;
  }
  try {
    const response = await ApiService.patch("/auth/users/me/", {
      language: store.getters.locale
    });
    await store.dispatch("setUser", response.data);
  } catch {
    await store.dispatch(
      "addError",
      "Ein Problem ist aufgetreten (Code=UserTransactionFromBackend). Bitte Kontaktieren sie den Support."
    );
    await store.dispatch("logout");
    setTimeout(async () => {
      await router.push("/");
      await store.dispatch("unsetErrorLoading");
    }, 10000);
    return;
  }
  const user = store.getters.user;
  await store.dispatch("changeLocale", user.language);
  if (!user.is_supervisor) {
    await store.dispatch("unsetLoading");
    return;
  }
  await router.push("/main");
  await store.dispatch("unsetLoading");
});
</script>

<style scoped lang="sass"></style>
