<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

// 1. Chame useRouter() para obter a instância do router que o Vue está usando
const router = useRouter();

function teste() {
    // 2. Use a instância reativa
    router.push('/admin');
}
</script>

<template>
    home
    <Button @click="teste" label="teste" />
</template>
