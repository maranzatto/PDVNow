<script setup lang="ts">
import Toast from 'primevue/toast';
import GlobalLoading from '@/components/GlobalLoading.vue';
</script>

<template>
    <main>
        <Toast />
        <GlobalLoading />
        <RouterView />
    </main>
</template>

<style scoped></style>
