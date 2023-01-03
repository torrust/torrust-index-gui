import Notifications from "notiwind-ts";
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Notifications);
})
