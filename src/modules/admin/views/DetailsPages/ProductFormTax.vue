<script setup lang="ts">
import InputText from 'primevue/inputtext'
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
            <label>NCM</label>
            <InputText v-model="form.ncm" />
        </div>

        <div class="form-field form-field-3">
            <label>CFOP</label>
            <InputText v-model="form.cfop" />
        </div>

        <div class="form-field form-field-3">
            <label>CST</label>
            <InputText v-model="form.cst" />
        </div>

        <div class="form-field form-field-3">
            <label>Origem</label>
            <InputText v-model="form.origin" />
        </div>

        <div class="form-field form-field-3">
            <label>ICMS %</label>
            <InputNumber v-model="form.icmsRate" />
        </div>

        <div class="form-field form-field-3">
            <label>PIS %</label>
            <InputNumber v-model="form.pisRate" />
        </div>

        <div class="form-field form-field-3">
            <label>COFINS %</label>
            <InputNumber v-model="form.cofinsRate" />
        </div>

        <div class="form-field form-field-6">
            <Checkbox v-model="form.hasTaxSubstitution" binary /> Substituição Tributária
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
