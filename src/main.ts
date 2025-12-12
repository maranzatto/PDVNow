import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// ordem correta
app.use(router);
app.use(createPinia());
app.use(ToastService);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});

app.mount("#app");

export default app;
