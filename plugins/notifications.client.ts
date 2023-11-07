import Notifications from "notiwind-ts";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications);
});
