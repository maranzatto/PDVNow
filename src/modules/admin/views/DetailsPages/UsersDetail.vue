<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

import MInputText from '../../../../components/MInputText.vue'

// Composables
import { useUserForm } from '../../composables/userDetails/useUserForm'
import { useUserValidation } from '../../composables/userDetails/useUserValidation'


const router = useRouter()

interface Props {
    id?: number
}

const props = defineProps<Props>()

const isEditing = ref(false)
const productId = ref<number | null>(null)

// Composables
const { form, errors, loadUser } = useUserForm()
const { validateForm } = useUserValidation(form, errors)

onMounted(() => {
    if (props.id) {
        console.log(props.id, 'fornecedor')
        isEditing.value = true
        productId.value = props.id

        const mockProduct = {
            name: 'Notebook Dell Inspiron 15',
            position: "Admin"
        }

        loadUser(mockProduct)
    }
})

const handleSubmit = () => {
    if (!validateForm()) {
        alert('Por favor, preencha todos os campos obrigatórios')
        return
    }

    if (isEditing.value) {
        console.log('Atualizando produto:', productId.value, form.value)
    } else {
        console.log('Criando produto:', form.value)
    }

    router.push({ name: 'AdminUsers' })
}

const goBack = () => {
    router.push({ name: 'AdminUsers' })
}
</script>

<template>

    <div class="page-header">
        <div class="header-left">
            <button class="btn-back" @click="goBack">
                <i class="pi pi-arrow-left"></i>
            </button>
            <div>
                <h1 class="page-title">
                    {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
                </h1>
                <p class="page-description">
                    {{ isEditing ? 'Atualize as informações do usuário' : 'Cadastre um novo usuário no sistema' }}
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
                        <label class="form-label">Nome do Fornecedor *</label>
                        <MInputText v-model="form.name" :invalid="!!errors.name" />
                        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">Cargo *</label>
                        <MInputText v-model="form.position" :invalid="!!errors.sku" />
                        <span v-if="errors.sku" class="error-message">{{ errors.sku }}</span>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <Button label="Cancelar" severity="secondary" type="button" @click="goBack" />
                <Button :label="isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'" type="submit" />
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

/* ==================== FORM GRID ==================== */
.form-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
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

.form-field-12 {
    grid-column: span 12;
}

@media (min-width: 768px) {
    .form-grid {
        grid-template-columns: repeat(12, 1fr);
    }

    .form-field-3 {
        grid-column: span 3;
    }

    .form-field-6 {
        grid-column: span 6;
    }

    .form-field-12 {
        grid-column: span 12;
    }
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
