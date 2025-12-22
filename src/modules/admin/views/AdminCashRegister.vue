<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue';
import { useCashRegisters } from '../composables/useCashRegisters';
import Button from 'primevue/button';

const {
    cashRegisters,
    columns,
    handleNewCashRegister,
    handleOpenCashRegister,
    handleCloseCashRegister,
    handleViewDetails,
    formatCurrency,
    formatDate,
    getStatusBadge
} = useCashRegisters();
</script>

<template>
    <div class="page">
        <h1 class="title">Caixas</h1>
        <DataTable :data="cashRegisters" :columns="columns" search-placeholder="Buscar caixas..."
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

            <template #currentValue="{ row }">
                {{ formatCurrency(row.currentValue) }}
            </template>

            <template #lastOpening="{ row }">
                {{ formatDate(row.lastOpening) }}
            </template>

            <template #lastClosure="{ row }">
                {{ formatDate(row.lastClosure) }}
            </template>

            <template #status="{ row }">
                <span class="badge" :class="getStatusBadge(row.status).class">
                    {{ getStatusBadge(row.status).text }}
                </span>
            </template>

            <template #actions="{ row }">
                <div class="action-buttons">
                    <button v-if="row.status === 'closed'" class="btn-action btn-edit"
                        @click="handleOpenCashRegister(row.id)" title="Abrir Caixa">
                        <i class="pi pi-lock-open"></i>
                    </button>
                    <button v-else class="btn-action btn-edit" @click="handleCloseCashRegister(row.id)"
                        title="Fechar Caixa">
                        <i class="pi pi-lock"></i>
                    </button>
                    <button class="btn-action btn-edit ml-2" @click="handleViewDetails(row.id)" title="Ver Detalhes">
                        <i class="pi pi-eye"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.badge-success {
    background-color: #d4edda;
    color: #155724;
}

.badge-warning {
    background-color: #fff3cd;
    color: #856404;
}

.badge-inactive {
    background-color: #e2e3e5;
    color: #383d41;
}

.ml-2 {
    margin-left: 0.5rem;
}
</style>
