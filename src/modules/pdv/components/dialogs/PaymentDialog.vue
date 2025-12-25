<script setup lang="ts">
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

const props = defineProps<{
    modelValue: boolean;
    subtotal: number;
    paymentAmount: number;
    change: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'update:paymentAmount', value: number): void;
    (e: 'processPayment'): void;
}>();

const localPaymentAmount = ref(props.paymentAmount);

watch(
    () => props.paymentAmount,
    (newVal) => {
        localPaymentAmount.value = newVal;
    }
);

watch(localPaymentAmount, (newVal) => {
    emit('update:paymentAmount', newVal);
});

const handleVisibilityChange = (visible: boolean) => {
    emit('update:modelValue', visible);
};

const confirmPayment = () => {
    if (localPaymentAmount.value >= props.subtotal) {
        emit('processPayment');
    }
};

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};
</script>

<template>
    <Dialog :visible="modelValue" header="Finalizar Venda" :modal="true" :style="{ width: '450px' }"
        @update:visible="handleVisibilityChange">
        <div class="p-fluid">
            <div class="field">
                <label for="subtotal">Total a Pagar</label>
                <InputText id="subtotal" :model-value="formatCurrency(subtotal)" disabled class="w-full" />
            </div>
            <div class="field">
                <label for="payment">Valor Recebido (R$)</label>
                <InputNumber id="payment" v-model="localPaymentAmount" mode="currency" currency="BRL" locale="pt-BR"
                    :min="subtotal" class="w-full" autofocus />
            </div>
            <div v-if="localPaymentAmount > 0" class="field">
                <label for="change">Troco</label>
                <InputText id="change" :model-value="formatCurrency(change)" disabled class="w-full" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="handleVisibilityChange(false)" />
            <Button label="Confirmar Pagamento" icon="pi pi-check" class="p-button-success"
                :disabled="localPaymentAmount < subtotal" @click="confirmPayment" />
        </template>
    </Dialog>
</template>
