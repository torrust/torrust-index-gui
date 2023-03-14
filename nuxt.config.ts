// https://v3.nuxtjs.org/api/configuration/nuxt.config
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL
        }
    },
    modules: [
        "@nuxtjs/tailwindcss"
    ],
    vite: {
        server: {
            fs: {
                // Allow serving files from one level up to the project root
                allow: [".."]
            }
        },
        plugins: [
            eslintPlugin()
        ]
    }
});
