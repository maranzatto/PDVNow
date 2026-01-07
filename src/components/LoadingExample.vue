<script setup lang="ts">
import { ref } from 'vue';
import { useLoadingStore } from '@/stores/loadingStore';
import { Button } from 'primevue';
import httpService from '@/services/httpService';

interface PostResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const loadingStore = useLoadingStore();
const { isLoading } = loadingStore;

const testResults = ref<string[]>([]);

const testGlobalLoading = async () => {
    try {
        const response = await httpService.get<PostResponse>('https://jsonplaceholder.typicode.com/posts/1');
        testResults.value.push(`✅ Requisição bem-sucedida: ${response.data.title}`);
    } catch (error) {
        testResults.value.push(`❌ Erro na requisição: ${error}`);
    }
};

const testManualLoading = async () => {
    loadingStore.startLoading();

    try {
        // Simula uma operação demorada
        await new Promise(resolve => setTimeout(resolve, 2000));
        testResults.value.push('✅ Operação manual concluída');
    } catch (error) {
        testResults.value.push(`❌ Erro na operação: ${error}`);
    } finally {
        loadingStore.stopLoading();
    }
};

const clearResults = () => {
    testResults.value = [];
};
</script>

<template>
    <div class="loading-example">
        <h3>Teste do Loading Global</h3>

        <div class="example-section">
            <h4>Status Atual</h4>
            <p>Loading Global: <strong>{{ isLoading ? 'Ativo' : 'Inativo' }}</strong></p>
        </div>

        <div class="example-section">
            <h4>Testes</h4>
            <div class="button-group">
                <Button
                    label="Testar Requisição HTTP"
                    @click="testGlobalLoading"
                    :disabled="isLoading"
                />
                <Button
                    label="Testar Loading Manual"
                    @click="testManualLoading"
                    :disabled="isLoading"
                    severity="secondary"
                />
                <Button
                    label="Limpar Resultados"
                    @click="clearResults"
                    severity="danger"
                    outlined
                />
            </div>
        </div>

        <div v-if="testResults.length > 0" class="example-section">
            <h4>Resultados</h4>
            <div class="results-list">
                <div v-for="(result, index) in testResults" :key="index" class="result-item">
                    {{ result }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.loading-example {
    @apply p-6 max-w-2xl mx-auto;
}

.example-section {
    @apply mb-6;
}

.example-section h4 {
    @apply text-lg font-semibold mb-3;
    color: var(--color-text-primary);
}

.example-section p {
    @apply mb-2;
    color: var(--color-text-secondary);
}

.button-group {
    @apply flex gap-3 flex-wrap;
}

.results-list {
    @apply space-y-2;
}

.result-item {
    @apply p-3 rounded-md;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    color: var(--color-text-primary);
    font-family: monospace;
    font-size: 0.875rem;
}
</style>
