<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'

interface Props { errors: ProductErrors }
defineProps<Props>()
const form = defineModel<ProductForm>('form', { required: true })
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-3">
            <Checkbox v-model="form.fractional" binary /> Fracionado
        </div>
        <div class="form-field form-field-3">
            <Checkbox v-model="form.saleByWeight" binary /> Venda por peso
        </div>
        <div class="form-field form-field-3">
            <Checkbox v-model="form.isKit" binary /> Kit
        </div>
        <div class="form-field form-field-3">
            <Checkbox v-model="form.allowSaleWithoutStock" binary /> Vender sem estoque
        </div>

        <div class="form-field form-field-3">
            <Checkbox v-model="form.promotional" binary /> Promocional
        </div>
        <div class="form-field form-field-3"><label>Preço Promo</label>
            <InputNumber v-model="form.promotionalPrice" />
        </div>
        <div class="form-field form-field-3"><label>Início</label>
            <Calendar v-model="form.promotionStart" />
        </div>
        <div class="form-field form-field-3"><label>Fim</label>
            <Calendar v-model="form.promotionEnd" />
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
