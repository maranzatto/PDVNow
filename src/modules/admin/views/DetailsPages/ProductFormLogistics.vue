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
        <div class="form-field form-field-3"><label>Peso</label>
            <InputNumber v-model="form.weight" />
        </div>
        <div class="form-field form-field-3"><label>Altura</label>
            <InputNumber v-model="form.height" />
        </div>
        <div class="form-field form-field-3"><label>Largura</label>
            <InputNumber v-model="form.width" />
        </div>
        <div class="form-field form-field-3"><label>Profundidade</label>
            <InputNumber v-model="form.depth" />
        </div>

        <div class="form-field form-field-6"><label>Marca</label>
            <InputText v-model="form.brand" />
        </div>
        <div class="form-field form-field-6"><label>Modelo</label>
            <InputText v-model="form.model" />
        </div>

        <div class="form-field form-field-3"><label>Lote</label>
            <InputText v-model="form.batch" />
        </div>
        <div class="form-field form-field-3"><label>Série</label>
            <InputText v-model="form.serial" />
        </div>
        <div class="form-field form-field-6"><label>Validade</label>
            <Calendar v-model="form.expirationDate" />
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
