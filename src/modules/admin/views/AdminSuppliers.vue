<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useSuppliers } from '../composables/useSuppliers'
const { suppliers, columns, handleNew, getStatusBadge, handleEdit, handleDelete } = useSuppliers()
</script>

<template>
    <div class="page">
        <h1 class="title">Fornecedores</h1>
        <DataTable :data="suppliers" :columns="columns" search-placeholder="Buscar fornecedores..."
            empty-message="Nenhum fornecedor encontrado">

            <template #headerActions>
                <button @click="handleNew" class="btn-primary">
                    <i class="pi pi-plus"></i>
                    Novo Produto
                </button>
            </template>

            <template #status="{ row }">
                <span class="badge" :class="getStatusBadge(row.status).class">
                    {{ getStatusBadge(row.status).text }}
                </span>
            </template>

            <template #actions="{ row }">
                <div class="action-buttons">
                    <button class="btn-action btn-edit" @click="handleEdit(row.id)">
                        <i class="pi pi-pencil"></i>
                    </button>
                    <button class="btn-action btn-delete" @click="handleDelete(row.id)">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>
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
</style>
