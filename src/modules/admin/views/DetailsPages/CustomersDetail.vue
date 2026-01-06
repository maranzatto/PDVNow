<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import MInputText from '../../../../components/MInputText.vue'
import { Button, useToast } from 'primevue'

// Composables
import { useCustomerDetail } from '../../composables/customerDetails/useCustomerDetail'
import { useCustomerValidation } from '@/modules/admin/composables/customerDetails/useCustomerValidation'
import MInputMask from '@/components/MInputMask.vue'
import MCalendar from '@/components/MCalendar.vue'
import MSelect from '@/components/MSelect.vue'
import { CustomerPersonType } from '@/api/generated'
import MInputMoney from '@/components/MInputMoney.vue'
import MTextarea from '@/components/MTextarea.vue'

const router = useRouter()
const toast = useToast();
const personTypes = Object.values(CustomerPersonType).map(value => ({
    label: value === 'Individual' ? 'Pessoa Física' : 'Pessoa Jurídica',
    value: value
}));

const props = defineProps<{
    id?: string
}>()

const {
    form,
    errors,
    isEditing,
    loadCustomerById,
    saveCustomer,
    resetForm,
    loading
} = useCustomerDetail()

const { validateForm } = useCustomerValidation(form, errors)

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
        const success = await saveCustomer()

        if (success) {
            router.push({ name: 'AdminCostumers' })
        } else {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao salvar o cliente',
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
    router.push({ name: 'AdminCostumers' })
}

onMounted(async () => {
    if (props.id) {
        await loadCustomerById(props.id)
    }
})

watch(
    () => props.id,
    async (id) => {
        if (id) {
            await loadCustomerById(id)
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
                    {{ isEditing ? 'Editar Cliente' : 'Novo Cliente' }}
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
                <h2 class="section-title">Dados Pessoais</h2>
                <div class="form-grid">
                    <div class="form-field form-field-4">
                        <label class="form-label">Nome do Cliente *</label>
                        <MInputText v-model="form.name" :invalid="!!errors.name" />
                        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                    </div>

                    <div class="form-field form-field-4">
                        <label class="form-label">CPF *</label>
                        <MInputMask v-model="form.document!" :invalid="!!errors.document" mask-type="cpf"
                            placeholder="000.000.000-00" :disabled="loading" />
                        <span v-if="errors.document" class="error-message">{{ errors.document }}</span>
                    </div>

                    <div class="form-field form-field-4">
                        <label class="form-label">Data de Aniversário *</label>
                        <MCalendar v-model="form.birthDate!" :invalid="!!errors.birthDate" :disabled="loading"
                            placeholder="00/00/0000" />
                        <span v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</span>
                    </div>

                    <div class="form-field form-field-4">
                        <label class="form-label">Tipo Pessoa *</label>
                        <MSelect v-model="form.personType!" :options="personTypes" />
                        <span v-if="errors.personType" class="error-message">{{ errors.personType }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 2: Contato -->
            <div class="form-section">
                <h2 class="section-title">Contato</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <label class="form-label">Telefone *</label>
                        <MInputMask v-model="form.phone!" :invalid="!!errors.phone" mask-type="phone"
                            placeholder="(00) 00000-0000" :disabled="loading" />
                        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">Celular *</label>
                        <MInputMask v-model="form.mobile!" :invalid="!!errors.mobile" mask-type="phone"
                            placeholder="(00) 00000-0000" :disabled="loading" />
                        <span v-if="errors.mobile" class="error-message">{{ errors.mobile }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">E-mail *</label>
                        <MInputText v-model="form.email" :invalid="!!errors.email" />
                        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 3: Localização -->
            <div class="form-section">
                <h2 class="section-title">Localização</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <label class="form-label">CEP *</label>
                        <MInputMask v-model="form.postalCode!" :invalid="!!errors.postalCode" mask-type="cep"
                            placeholder="00000-000" :disabled="loading" />
                        <span v-if="errors.postalCode" class="error-message">{{ errors.postalCode }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">Estado *</label>
                        <MInputText v-model="form.state" :invalid="!!errors.state" />
                        <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
                    </div>

                    <div class="form-field form-field-4">
                        <label class="form-label">Cidade *</label>
                        <MInputText v-model="form.city" :invalid="!!errors.city" />
                        <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Endereço 1 *</label>
                        <MInputText v-model="form.addressLine1" :invalid="!!errors.addressLine1" />
                        <span v-if="errors.addressLine1" class="error-message">{{ errors.addressLine1 }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Endereço 2 *</label>
                        <MInputText v-model="form.addressLine2" :invalid="!!errors.addressLine2" />
                        <span v-if="errors.addressLine2" class="error-message">{{ errors.addressLine2 }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 4: Financeiro -->
            <div class="form-section">
                <h2 class="section-title">Financeiro</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label class="form-label">Limite de crédito *</label>
                        <MInputMoney v-model="form.creditLimit" :invalid="!!errors.creditLimit" />
                        <span v-if="errors.creditLimit" class="error-message">{{ errors.creditLimit }}</span>
                    </div>

                    <div class="form-field form-field-4">
                        <label class="form-label">Saldo atual</label>
                        <MInputMoney v-model="form.currentBalance" :invalid="!!errors.currentBalance" />
                        <span v-if="errors.currentBalance" class="error-message">{{ errors.currentBalance }}</span>
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 4: Observações -->
            <div class="form-section">
                <h2 class="section-title">Observações</h2>
                <div class="form-grid">
                    <div class="form-field form-field-12">
                        <label class="form-label">Notas de observação *</label>
                        <MTextarea v-model="form.notes" :invalid="!!errors.notes" />
                        <span v-if="errors.notes" class="error-message">{{ errors.notes }}</span>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <Button label="Cancelar" severity="secondary" type="button" @click="goBack" />
                <Button :label="isEditing ? 'Atualizar Cliente' : 'Cadastrar Cliente'" type="submit"
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

/* ==================== FORM GRID ==================== */
/* Grid system movido para base.css */

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
