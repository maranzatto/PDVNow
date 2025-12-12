<script setup lang="ts">
import DataTable from '@/volt/DataTable.vue';
import Column from 'primevue/column';
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import SecondaryButton from '@/volt/SecondaryButton.vue';
import InputText from 'primevue/inputtext';

// Tipagem
interface Product {
    id: string;
    code: string;
    name: string;
    category: string;
    quantity: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    price: number;
}

interface ColumnConfig {
    field: keyof Product | string;
    header: string;
    sortable: boolean;
    style: string;
}

// Toast
const Toast = useToast();
const selectRow = (data: Product) => {
    Toast.add({
        severity: 'info',
        summary: data.name,
        detail: `${data.inventoryStatus} | R$ ${data.price}`,
        life: 3000
    });
};

// Colunas
const columns = ref<ColumnConfig[]>([
    { field: 'id', header: 'ID', sortable: true, style: 'width: 10%' },
    { field: 'code', header: 'Código', sortable: true, style: 'width: 15%' },
    { field: 'name', header: 'Nome', sortable: true, style: 'width: 20%' },
    { field: 'category', header: 'Categoria', sortable: true, style: 'width: 15%' },
    { field: 'quantity', header: 'Estoque', sortable: true, style: 'width: 10%' },
    { field: 'inventoryStatus', header: 'Status', sortable: true, style: 'width: 15%' },
    { field: 'price', header: 'Preço (R$)', sortable: true, style: 'width: 15%' },
]);

// Dados mockados
const products = ref<Product[]>([
    { id: '1000', code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1001', code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 61, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1002', code: 'zz21tvsaj', name: 'Blue Band', category: 'Fitness', quantity: 2, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1003', code: 'wjs35a2q', name: 'Blue T-Shirt', category: 'Clothing', quantity: 79, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1004', code: 'h456wghj', name: 'Brown Purse', category: 'Accessories', quantity: 0, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1005', code: 'j49y8x1l', name: 'Chakra Bracelet', category: 'Accessories', quantity: 52, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1006', code: 'm2z57rzt', name: 'Galaxy Earrings', category: 'Accessories', quantity: 34, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1007', code: 'yux3j5kj', name: 'Game Controller', category: 'Electronics', quantity: 7, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1008', code: 'tx1tshjv', name: 'Gaming Set', category: 'Electronics', quantity: 10, inventoryStatus: 'LOWSTOCK', price: 29.99 },
    { id: '1009', code: 'ksdgjnh3', name: 'Gold Phone Case', category: 'Accessories', quantity: 4, inventoryStatus: 'LOWSTOCK', price: 29.99 },
]);

// Search bar
const search = ref('');

// Computed que filtra os produtos
const filteredProducts = computed(() => {
    if (!search.value) return products.value;
    return products.value.filter(p =>
        p.name.toLowerCase().includes(search.value.toLowerCase()) ||
        p.code.toLowerCase().includes(search.value.toLowerCase()) ||
        p.category.toLowerCase().includes(search.value.toLowerCase())
    );
});
</script>

<template>
    <section id="contact" class="section contact">
        <h3>Lista de Produtos (Dados Mockados)</h3>

        <!-- Search bar -->
        <div class="flex px-3 mb-4">
            <InputText v-model="search" placeholder="Pesquisar por nome, código ou categoria" class="w-96" />
        </div>

        <section class="contact">
            <DataTable :value="filteredProducts" paginator :rows="5" dataKey="id" sortMode="multiple" removableSort>
                <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
                    :sortable="col.sortable" />
                <Column class="w-24">
                    <template #body="{ data }">
                        <SecondaryButton icon="pi pi-search" @click="selectRow(data)" severity="secondary" rounded />
                    </template>
                </Column>
            </DataTable>
        </section>
    </section>
</template>

<style scoped>
@import "tailwindcss";

.contact {
    @apply bg-gray-900;
    text-align: center;
    padding: 0.3rem 0;
}
</style>
