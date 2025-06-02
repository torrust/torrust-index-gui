import Notifications from "notiwind-ts";
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp: { vueApp: { use: (arg0: any) => void; }; }) => {
  nuxtApp.vueApp.use(Notifications);
});
