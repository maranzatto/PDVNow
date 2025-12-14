<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useSuppliers } from '../composables/useSuppliers'

const { suppliers, columns, handleNew } = useSuppliers()
</script>

<template>
    <div class="page">
        <h1 class="title">Fornecedores</h1>
        <DataTable :data="suppliers" :columns="columns">
            <template #actions>
                <button class="btn-primary" @click="handleNew">+ Novo</button>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.page {
    padding: .5rem .7rem;
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
}

.title {
    @apply mb-4 text-2xl font-semibold;
}

.btn-primary {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    background: var(--gradient-primary);
    color: var(--color-white);
    border: none;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
    cursor: pointer;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}
</style>
