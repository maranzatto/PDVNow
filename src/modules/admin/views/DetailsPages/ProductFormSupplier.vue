<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'

interface Props { errors: ProductErrors }
defineProps<Props>()
const form = defineModel<ProductForm>('form', { required: true })
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-6">
            <label>Fornecedor</label>
            <InputText v-model="form.supplier" />
        </div>

        <div class="form-field form-field-3">
            <label>Código Fornecedor</label>
            <InputText v-model="form.supplierCode" />
        </div>

        <div class="form-field form-field-3">
            <label>Custo de Compra</label>
            <InputNumber v-model="form.purchaseCost" />
        </div>

        <div class="form-field form-field-3">
            <label>Prazo Reposição (dias)</label>
            <InputNumber v-model="form.replenishmentTime" />
        </div>

        <div class="form-field form-field-3">
            <label>Última Compra</label>
            <Calendar v-model="form.lastPurchaseDate" />
        </div>

        <div class="form-field form-field-3">
            <label>Valor Última Compra</label>
            <InputNumber v-model="form.lastPurchaseValue" />
        </div>
    </div>
</template>

<style scoped>
.form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>
