<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useProducts } from '../composables/useProducts'

const { products, columns, handleNew, handleEdit, handleDelete, formatPrice, getStockClass, getStatusBadge } = useProducts()
</script>

<template>
    <div class="page">
        <h1 class="title">Produtos</h1>

        <DataTable :data="products" :columns="columns" search-placeholder="Buscar produtos..."
            empty-message="Nenhum produto encontrado">
            Slot para Preço
            <template #price="{ row }">
                {{ formatPrice(row.price) }}
            </template>

            <template #stock="{ row }">
                <span :class="getStockClass(row.stock)">
                    {{ row.stock }}
                </span>
            </template>

            Slot para Status
            <template #status="{ row }">
                <span class="badge" :class="getStatusBadge(row.status).class">
                    {{ getStatusBadge(row.status).text }}
                </span>
            </template>

            Slot para Ações
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

            Ações no Header
            <template #headerActions>
                <button @click="handleNew" class="btn-primary">
                    <i class="pi pi-plus"></i>
                    Novo Produto
                </button>
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
