<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

interface LoginForm {
    email: string;
    password: string;
}

const router = useRouter();

const form = reactive<LoginForm>({
    email: '',
    password: '',
});

function goAdmin() {
    router.push('/admin');
}
</script>

<template>
    <div class="login-wrapper">
        <Card class="login-card">
            <template #title>Login</template>
            <template #content>
                <form class="login-form">
                    <div class="field">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="form.email" type="email" />
                    </div>

                    <div class="field">
                        <label for="password">Senha</label>
                        <Password id="password" v-model="form.password" :feedback="false" toggleMask />
                    </div>
                </form>
            </template>
        </Card>

        <!-- Botão fora do Card -->
        <Button label="Entrar" class="login-button" @click="goAdmin" />
    </div>
</template>

<style scoped>
@import "tailwindcss";

.login-wrapper {
    @apply min-h-screen flex flex-col items-center justify-center gap-4;
}

.login-card {
    @apply w-full max-w-sm shadow-lg;
}

.login-form {
    @apply flex flex-col gap-4;
}

.field {
    @apply flex flex-col gap-1;
}

.login-button {
    @apply w-full max-w-sm;
}
</style>
