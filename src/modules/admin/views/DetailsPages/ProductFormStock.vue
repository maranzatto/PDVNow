<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'

interface Props { errors: ProductErrors }
defineProps<Props>()
const form = defineModel<ProductForm>('form', { required: true })
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-6">
            <Checkbox v-model="form.stockControl" binary /> Controlar estoque
        </div>

        <div class="form-field form-field-3">
            <label>Estoque Atual</label>
            <InputNumber v-model="form.stock" />
        </div>

        <div class="form-field form-field-3">
            <label>Estoque Mínimo</label>
            <InputNumber v-model="form.minStock" />
        </div>

        <div class="form-field form-field-3">
            <label>Estoque Máximo</label>
            <InputNumber v-model="form.maxStock" />
        </div>

        <div class="form-field form-field-3">
            <label>Localização</label>
            <InputText v-model="form.location" />
        </div>

        <div class="form-field form-field-6">
            <label>Última Movimentação</label>
            <Calendar v-model="form.lastMovement" />
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
