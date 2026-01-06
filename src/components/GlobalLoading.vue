<script setup lang="ts">
import { useLoadingStore } from '@/stores/loadingStore';
import { storeToRefs } from 'pinia';

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
</script>

<template>
    <div v-if="isLoading" class="global-loading-overlay">
        <div class="loading-container">
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loading-content">
                <p class="loading-text">Carregando...</p>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.global-loading-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
    backdrop-filter: blur(8px);
}

.loading-container {
    @apply flex flex-col items-center justify-center;
    animation: fadeIn 0.3s ease-out;
}

.loading-spinner {
    @apply relative mb-6;
    width: 60px;
    height: 60px;
}

.spinner-ring {
    @apply absolute rounded-full border-2;
    width: 100%;
    height: 100%;
    border-color: var(--color-primary);
    border-top-color: transparent;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(1) {
    animation-delay: -0.45s;
}

.spinner-ring:nth-child(2) {
    animation-delay: -0.3s;
}

.spinner-ring:nth-child(3) {
    animation-delay: -0.15s;
}

.loading-content {
    @apply text-center;
}

.loading-text {
    @apply text-lg font-medium mb-2;
    color: var(--color-text-primary);
}

.loading-dots {
    @apply flex justify-center gap-1;
}

.loading-dots span {
    @apply w-2 h-2 rounded-full;
    background-color: var(--color-primary);
    animation: pulse 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
