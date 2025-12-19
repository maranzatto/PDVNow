<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import type { ProductForm, ProductErrors } from '@/modules/admin/types/productDetails/productType'

interface Props { errors: ProductErrors }
defineProps<Props>()
const form = defineModel<ProductForm>('form', { required: true })
</script>

<template>
    <div class="form-grid">
        <div class="form-field form-field-6"><label>Código ERP</label>
            <InputText v-model="form.erpCode" />
        </div>
        <div class="form-field form-field-6"><label>Código Contábil</label>
            <InputText v-model="form.accountingCode" />
        </div>

        <div class="form-field form-field-6">
            <Checkbox v-model="form.syncEcommerce" binary /> Sincronizar e-commerce
        </div>

        <div class="form-field form-field-6"><label>Imagem</label>
            <InputText v-model="form.image" />
        </div>
        <div class="form-field form-field-12"><label>Observações</label><Textarea v-model="form.notes" rows="3" /></div>
    </div>
</template>

<style scoped>
.form-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
}
</style>
