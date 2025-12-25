<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Card from 'primevue/card';
import Button from 'primevue/button';
import MInputText from '@/components/MInputText.vue';

const router = useRouter();
const loading = ref(false);

function handleLogin() {
    loading.value = true;
    // Redireciona diretamente para o admin
    router.push('/admin');
    loading.value = false;
}

function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        handleLogin();
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-header">
                <h1 class="text-3xl font-bold text-primary">PDV Now</h1>
                <p class="text-gray-500 dark:text-gray-400">Faça login para continuar</p>
            </div>

            <Card class="login-card">
                <template #title>
                    <div class="text-center">
                        <i class="pi pi-user-circle text-5xl text-primary mb-2"></i>
                        <h2 class="text-xl font-semibold">Acesso ao Sistema</h2>
                    </div>
                </template>

                <template #content>
                    <form class="login-form" @submit.prevent="handleLogin" @keyup.enter="handleKeyPress">
                        <div class="field">
                            <label for="email" class="form-label">E-mail</label>
                            <MInputText id="email" type="email" placeholder="Digite seu e-mail" :disabled="loading"
                                autocomplete="username" class="w-full" />
                        </div>

                        <div class="field">
                            <div class="flex justify-between items-center">
                                <router-link to="/forgot-password" class="text-sm text-primary hover:underline">
                                    Esqueceu a senha?
                                </router-link>
                            </div>
                            <Password id="password" :feedback="false" toggleMask placeholder="Digite sua senha"
                                input-class="w-full" :input-style="{ width: '100%' }" class="w-full"
                                autocomplete="current-password" />
                        </div>

                        <Button type="submit" label="Entrar" :loading="loading" class="login-button"
                            icon="pi pi-sign-in" icon-pos="right" />
                    </form>
                </template>
            </Card>

            <div class="login-footer">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Não tem uma conta?
                    <router-link to="/register" class="text-primary hover:underline">
                        Cadastre-se
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.login-container {
    @apply min-h-screen flex items-center justify-center p-4;
    background-color: var(--color-bg-secondary)
}

.login-content {
    @apply w-full max-w-md space-y-6;
}

.login-header {
    @apply text-center space-y-2;
}

.login-card {
    @apply shadow-xl rounded-xl overflow-hidden border-none;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: var(--color-bg-primary);
}

:deep(.p-card) {
    @apply shadow-none;
}

:deep(.p-card .p-card-title) {
    @apply text-center text-xl font-semibold text-gray-800 dark:text-white mb-6;
}

:deep(.p-card .p-card-content) {
    @apply p-6 pt-0;
}

.login-form {
    @apply space-y-6;
}

.field {
    @apply space-y-2;
}

.form-label {
    @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1;
}

:deep(.p-password) {
    @apply w-full;
}

:deep(.p-password-input) {
    @apply w-full;
}

.login-button {
    @apply w-full py-3 text-base font-medium rounded-lg transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800;
}

.login-footer {
    @apply text-center text-sm text-gray-500 dark:text-gray-400;
}

/* Animations */
.login-card {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
