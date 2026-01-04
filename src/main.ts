import "./assets/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./modules/auth/store/auth";

// 1. Cria a aplicação
const app = createApp(App);

// 2. Cria e registra o Pinia ANTES de usar qualquer store
const pinia = createPinia();
app.use(pinia);

// 3. Registra outros plugins
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});

// 4. AGORA pode usar a store
const authStore = useAuthStore();

// 5. Inicializa autenticação e então monta o app
authStore.initialize().finally(() => {
    app.mount("#app");
});

export default app;
