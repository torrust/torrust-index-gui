import Notifications from "notiwind-ts";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp: { vueApp: { use: (arg0: any) => void; }; }) => {
  nuxtApp.vueApp.use(Notifications);
});
