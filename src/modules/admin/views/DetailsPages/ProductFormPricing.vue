<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'

interface Props { errors: ProductErrors }
defineProps<Props>()
const form = defineModel<ProductForm>('form', { required: true })
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-3">
            <label>Preço de Venda *</label>
            <InputNumber v-model="form.salePrice" />
        </div>

        <div class="form-field form-field-3">
            <label>Preço de Custo *</label>
            <InputNumber v-model="form.costPrice" />
        </div>

        <div class="form-field form-field-3">
            <label>Margem (%)</label>
            <InputNumber v-model="form.profitMargin" />
        </div>

        <div class="form-field form-field-3">
            <label>Preço Mínimo</label>
            <InputNumber v-model="form.minPrice" />
        </div>

        <div class="form-field form-field-6">
            <Checkbox v-model="form.allowDiscount" binary /> Permitir desconto
        </div>
    </div>
</template>

<style scoped>
.form-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.form-field {
    display: flex;
    flex-direction: column;
}

.form-field-3 {
    grid-column: span 1;
}

.form-field-6 {
    grid-column: span 2;
}
</style>
