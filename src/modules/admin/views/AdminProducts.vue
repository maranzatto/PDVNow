<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useProducts } from '../composables/useProducts'
import { Button } from 'primevue';

const { products, columns, handleNew, handleEdit, handleDelete, formatPrice, getStockClass } = useProducts()
</script>

<template>
    <div class="">
        <h1 class="title">Produtos</h1>
        <DataTable :data="products" :columns="columns" search-placeholder="Buscar produtos..."
            empty-message="Nenhum produto encontrado">
            <template #headerActions>
                <Button @click="handleNew" class="p-button-primary">
                    <i class="pi pi-plus"></i>
                    <span>Novo Produto</span>
                </Button>
            </template>

            <template #price="{ row }">
                {{ formatPrice(row.salePrice) }}
            </template>

            <template #stock="{ row }">
                <span :class="getStockClass(row.stockQuantity)">
                    {{ row.stockQuantity }}
                </span>
            </template>

            <template #actions="{ row }">
                <div class="action-buttons">
                    <button class="btn-action btn-edit" @click="handleEdit(row.id!)">
                        <i class="pi pi-pencil"></i>
                    </button>
                    <button class="btn-action btn-delete" @click="handleDelete(row.id!)">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped></style>
