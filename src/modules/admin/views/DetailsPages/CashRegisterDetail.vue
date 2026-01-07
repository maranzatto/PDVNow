<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Button, useToast } from "primevue";

import MInputText from "@/components/MInputText.vue";
import MInputMoney from "@/components/MInputMoney.vue";

import { useCashRegisterDetail } from "@/modules/admin/composables/cashRegisterDetails/useCashRegisterDetail";

const props = defineProps<{ id?: string }>();

const router = useRouter();
const toast = useToast();

const {
    form,
    mode,
    loadCashRegisterById,
    submit,
    resetForm,
} = useCashRegisterDetail();

const handleSubmit = async () => {
    const success = await submit();
    if (success) {
        router.push({ name: "AdminCashRegister" });
    } else {
        toast.add({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possível abrir o caixa",
            life: 3000,
        });
    }
};

const goBack = () => router.push({ name: "AdminCashRegister" });

onMounted(() => {
    if (props.id) loadCashRegisterById(props.id);
});

watch(
    () => props.id,
    (id) => {
        if (id) loadCashRegisterById(id);
        else resetForm();
    }
);
</script>


<template>
    <div class="page-header">
        <div class="header-left">
            <button class="btn-back" @click="goBack">
                <i class="pi pi-arrow-left"></i>
            </button>
            <div>
                <h1 class="page-title">
                    {{ mode === 'view' ? 'Caixa Aberto' : 'Abrir Caixa' }}
                </h1>
                <p class="page-description">
                    {{ mode === 'view'
                        ? 'Visualização da sessão atual do caixa'
                        : 'Informe os dados para abrir um novo caixa' }}
                </p>
            </div>
        </div>
    </div>

    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <!-- SEÇÃO: Informações -->
            <div class="form-section">
                <h2 class="section-title">Informações</h2>

                <div class="form-grid">
                    <!-- Nome do caixa -->
                    <div class="form-field form-field-6">
                        <label class="form-label">Nome do caixa *</label>
                        <MInputText v-model="form.cashRegisterName" :disabled="mode === 'view'" />
                    </div>

                    <!-- Responsável / Override -->
                    <div class="form-field form-field-6">
                        <label class="form-label">Responsável *</label>
                        <MInputText v-model="form.overrideCode" :disabled="mode === 'view'" />
                    </div>

                    <!-- Saldo inicial -->
                    <div class="form-field form-field-6">
                        <label class="form-label">Saldo inicial *</label>
                        <MInputMoney v-model="form.openingFloatAmount" :disabled="mode === 'view'" />
                    </div>

                    <!-- Setor -->
                    <div class="form-field form-field-6">
                        <label class="form-label">Setor *</label>
                        <MInputText v-model="form.location" :disabled="mode === 'view'" />
                    </div>
                </div>
            </div>

            <!-- AÇÕES -->
            <div class="form-actions">
                <Button label="Voltar" severity="secondary" type="button" @click="goBack" />

                <Button v-if="mode === 'open'" label="Abrir Caixa" type="submit" />
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
