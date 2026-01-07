<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue';
import { useCashRegisters } from '../composables/useCashRegisters';
import Button from 'primevue/button';

const {
    cashRegister,
    columns,
    handleNewCashRegister,
    handleViewDetails,
} = useCashRegisters();
</script>

<template>
    <div class="page">
        <h1 class="title">Caixas</h1>
        <DataTable :data="cashRegister" :columns="columns" search-placeholder="Buscar caixas..."
            empty-message="Nenhum caixa encontrado">
            <template #headerActions>
                <Button @click="handleNewCashRegister" class="p-button-primary">
                    <i class="pi pi-plus"></i>
                    <span>Novo Caixa</span>
                </Button>
                <Button class="p-button-secondary ml-2">
                    <i class="pi pi-file-pdf"></i>
                    <span>Relatório</span>
                </Button>
            </template>

            <template #actions="{ row }">
                <div class="action-buttons">
                    <button class="btn-action btn-edit ml-2" @click="handleViewDetails(row.id!)" title="Ver Detalhes">
                        <i class="pi pi-eye"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped></style>
