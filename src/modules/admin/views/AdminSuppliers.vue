<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useSuppliers } from '../composables/useSuppliers'
import { Button } from 'primevue';

const { suppliers, columns, handleNew, handleEdit, handleDelete } = useSuppliers()
</script>

<template>
    <div class="page">
        <h1 class="title">Fornecedores</h1>
        <DataTable :data="suppliers" :columns="columns" search-placeholder="Buscar fornecedores..."
            empty-message="Nenhum fornecedor encontrado">

            <template #headerActions>
                <Button @click="handleNew" class="p-button-primary">
                    <i class="pi pi-plus"></i>
                    <span>Novo Fornecedor</span>
                </Button>
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

<style></style>
