<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'
import { useProductOptions } from '@/modules/admin/composables/productDetails/useProductOptions'

interface Props {
    errors: ProductErrors
}

defineProps<Props>()

// defineModel cria automaticamente a prop e o emit
const form = defineModel<ProductForm>('form', { required: true })

const { categories, statusOptions } = useProductOptions()
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-6">
            <label class="form-label">Nome do Produto *</label>
            <InputText v-model="form.name" :invalid="!!errors.name" />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <div class="form-field form-field-3">
            <label class="form-label">Código de barras</label>
            <InputText v-model="form.barcode" />
        </div>

        <div class="form-field form-field-3">
            <label class="form-label">SKU *</label>
            <InputText v-model="form.sku" :invalid="!!errors.sku" />
            <span v-if="errors.sku" class="error-message">{{ errors.sku }}</span>
        </div>

        <div class="form-field form-field-6">
            <label class="form-label">Categoria *</label>
            <Select v-model="form.category" :options="categories" :invalid="!!errors.category" />
            <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
        </div>

        <div class="form-field form-field-6">
            <label class="form-label">Status *</label>
            <Select v-model="form.status" :options="statusOptions" optionLabel="label" optionValue="value" />
        </div>
    </div>
</template>

<style scoped>
.form-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    padding: 1.5rem;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-field-3 {
    grid-column: span 12;
}

.form-field-6 {
    grid-column: span 12;
}

@media (min-width: 768px) {
    .form-field-3 {
        grid-column: span 3;
    }

    .form-field-6 {
        grid-column: span 6;
    }
}

.form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--p-text-color);
}

.error-message {
    color: var(--p-red-500);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}
</style>
