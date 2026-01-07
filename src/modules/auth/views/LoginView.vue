<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../store/auth';
import { useLoadingStore } from '@/stores/loadingStore';
import { storeToRefs } from 'pinia';
import { Button, Card } from 'primevue';
import MInputText from '@/components/MInputText.vue';
import MPassword from '@/components/MPassword.vue';

interface ApiError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const { isLoading: globalLoading } = storeToRefs(loadingStore);

const email = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);

const isFormDisabled = computed(() => loading.value || globalLoading.value);

const handleLogin = async (): Promise<void> => {
    if (!email.value.trim() || !password.value.trim()) {
        toast.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'Preencha todos os campos',
            life: 3000
        });
        return;
    }

    try {
        loading.value = true;
        await authStore.login({
            username: email.value,
            password: password.value
        });

        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Login realizado com sucesso!',
            life: 3000
        });

        // O router guard vai redirecionar automaticamente
        router.push('/admin/dashboard');
    } catch (error: unknown) {
        const err = error as ApiError;
        const errorMessage = err.response?.data?.message || 'Erro ao realizar login';

        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};

const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && !isFormDisabled.value) {
        handleLogin();
    }
};
</script>


<template>
    <div class="login-container">
        <div class="login-header">
            <h1 class="header-title">PDV Now</h1>
            <p class="header-subtitle">Faça login para continuar</p>
        </div>

        <Card class="login-card">
            <template #title>
                <div class="card-title">
                    <i class="card-icon pi pi-user-circle"></i>
                    <h2 class="card-heading">Acesso ao Sistema</h2>
                </div>
            </template>

            <template #content>
                <form class="login-form" @submit.prevent="handleLogin" @keyup.enter="handleKeyPress">
                    <div class="field">
                        <label for="email" class="form-label">E-mail</label>
                        <MInputText
                            id="email"
                            v-model="email"
                            placeholder="Digite seu e-mail"
                            :disabled="isFormDisabled"
                            autocomplete="username"
                            class="form-input"
                        />
                    </div>

                    <div class="field">
                        <label for="password" class="form-label">Senha</label>
                        <MPassword
                            id="password"
                            v-model="password"
                            placeholder="Digite sua senha"
                            :disabled="isFormDisabled"
                            input-class="password-input"
                            class="form-input"
                            autocomplete="current-password"
                        />

                        <div class="forgot-password-container">
                            <router-link to="/forgot-password" class="forgot-password-link">
                                Esqueceu a senha?
                            </router-link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label="Entrar"
                        :loading="loading"
                        :disabled="isFormDisabled"
                        class="login-button"
                        icon="pi pi-sign-in"
                        icon-pos="right"
                    />
                </form>
            </template>
        </Card>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.login-container {
    @apply min-h-screen flex flex-col items-center justify-center p-4;
    background-color: var(--color-bg-primary);
}

.login-header {
    @apply text-center mb-8;
}

.header-title {
    @apply text-3xl font-bold;
}

.header-subtitle {
    color: var(--color-text-primary)
}

.login-card {
    @apply w-full;
    width: 460px;
    box-shadow: var(--shadow-md);
    background-color: var(--color-bg-secondary);
}

.card-title {
    @apply text-center;
}

.card-icon {
    @apply text-5xl mb-2;
}

.card-heading {
    @apply text-xl font-semibold;
}

.login-form {
    @apply space-y-6;
}

.field {
    @apply space-y-2;
}

.form-label {
    @apply block text-sm font-medium;
    color: var(--color-text-primary)
}

.form-input {
    @apply w-full;
}

.password-input {
    @apply w-full;
}

.forgot-password-container {
    @apply flex justify-between items-center mt-2;
}

.forgot-password-link {
    @apply text-sm hover:underline;
}

.login-button {
    @apply w-full mt-6;
}
</style>
