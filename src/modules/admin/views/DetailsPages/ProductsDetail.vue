<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import MInputText from '../../../../components/MInputText.vue'
import MInputNumber from '../../../../components/MInputNumber.vue'
import MInputMoney from '../../../../components/MInputMoney.vue'
import { Button, useToast } from 'primevue'

// Composables
import { useProductDetail } from '../../composables/productDetails/useProductDetail'
import { useProductValidation } from '@/modules/admin/composables/productDetails/useProductValidation'

const router = useRouter()
const toast = useToast();

const props = defineProps<{
    id?: string
}>()

const {
    form,
    errors,
    isEditing,
    loadProductById,
    saveProduct,
    resetForm,
    loading
} = useProductDetail()

const { validateForm } = useProductValidation(form, errors)

const handleSubmit = async () => {
    if (!validateForm()) {
        toast.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'Por favor, preencha todos os campos obrigatórios',
            life: 3000
        });
        return
    }

    loading.value = false;
    try {
        const success = await saveProduct()

        if (success) {
            router.push({ name: 'AdminProducts' })
        } else {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao salvar o produto',
                life: 3000
            });
        }
    } catch (error) {
        toast.add({
            severity: 'danger',
            summary: 'Atenção',
            detail: error,
            life: 3000
        });
    } finally {
        loading.value = false;
    }
}

const goBack = () => {
    router.push({ name: 'AdminProducts' })
}

onMounted(async () => {
    if (props.id) {
        await loadProductById(props.id)
    }
})

watch(
    () => props.id,
    async (id) => {
        if (id) {
            await loadProductById(id)
        } else {
            resetForm()
        }
    }
)
</script>


<template>

    <div class="page-header">
        <div class="header-left">
            <button class="btn-back" @click="goBack">
                <i class="pi pi-arrow-left"></i>
            </button>
            <div>
                <h1 class="page-title">
                    {{ isEditing ? 'Editar Produto' : 'Novo Produto' }}
                </h1>
                <p class="page-description">
                    {{ isEditing ? 'Atualize as informações do produto' : 'Cadastre um novo produto no sistema' }}
                </p>
            </div>
        </div>
    </div>

    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <!-- SEÇÃO 1: Identificação -->
            <div class="form-section">
                <h2 class="section-title">Identificação</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label class="form-label">Nome do Produto *</label>
                        <MInputText v-model="form.name" :invalid="!!errors.name" />
                        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">Cód de barras</label>
                        <MInputText v-model="form.barcode" maxlength="13" :invalid="!!errors.barcode" />
                        <span v-if="errors.barcode" class="error-message">{{ errors.barcode }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">SKU *</label>
                        <MInputText v-model="form.sku" :invalid="!!errors.sku" />
                        <span v-if="errors.sku" class="error-message">{{ errors.sku }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 2: Preço & Venda -->
            <div class="form-section">
                <h2 class="section-title">Preço & Venda</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label class="form-label">Preço de Venda *</label>
                        <MInputMoney v-model="form.salePrice" :invalid="!!errors.salePrice" />
                        <span v-if="errors.salePrice" class="error-message">{{ errors.salePrice }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Preço de Custo *</label>
                        <MInputMoney v-model="form.costPrice" :invalid="!!errors.costPrice" />
                        <span v-if="errors.costPrice" class="error-message">{{ errors.costPrice }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 3: Estoque -->
            <div class="form-section">
                <h2 class="section-title">Estoque</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label class="form-label">Estoque Atual</label>
                        <MInputNumber v-model="form.stockQuantity!" :invalid="!!errors.stockQuantity" />
                        <span v-if="errors.stockQuantity" class="error-message">{{ errors.stockQuantity }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Estoque Mínimo</label>
                        <MInputNumber v-model="form.minStockQuantity!" />
                        <span v-if="errors.minStockQuantity" class="error-message">{{ errors.minStockQuantity }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 5: Fornecedor -->
            <div class="form-section">
                <h2 class="section-title">Fornecedor</h2>
                <div class="form-grid">
                    <div class="form-field form-field-12">
                        <label class="form-label">Fornecedor</label>
                        <MInputText v-model="form.supplierId" />
                        <span v-if="errors.supplierId" class="error-message">{{ errors.supplierId }}</span>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <Button label="Cancelar" severity="secondary" type="button" @click="goBack" />
                <Button :label="isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'" type="submit"
                    :loading="loading" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.page-header {
    margin-bottom: 2rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn-back {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-gray-700);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.btn-back:hover {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
}

.page-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
}

.page-description {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

/* ==================== FORM CONTAINER ==================== */
.form-container {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-gray-300);
    border-radius: 0.75rem;
    overflow: hidden;
}

.form-section {
    padding: 1.5rem;
    /* border-bottom: 1px solid var(--color-gray-300); */
}

.form-section:last-of-type {
    border-bottom: none;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-white);
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-primary);
    border-bottom: 1px solid var(--color-gray-300);
    margin-bottom: 1.5rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid var(--color-gray-300);
    background-color: var(--color-bg-primary);
}

.form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
}

.error-message {
    color: var(--p-red-500);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

/* Estilos específicos para o formulário */
.form-field :deep(.p-checkbox) {
    flex-direction: row !important;
    align-items: center !important;
}
</style>
