<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { usePDV, type CartItem } from '../composables/usePDV';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';
import DiscountDialog from '../components/dialogs/DiscountDialog.vue';
import PaymentDialog from '../components/dialogs/PaymentDialog.vue';
import Toast from 'primevue/toast';

// Composable
const toast = useToast();
const {
    cart,
    barcodeInput,
    errorMessage,
    successMessage,
    subtotal,
    totalItems,
    removeItem,
    updateQuantity,
    applyDiscount,
    processBarcodeInput,
    handleBarcodeInput,
    clearCart,
} = usePDV();

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

// Component State
const showDiscountDialog = ref(false);
const showPaymentDialog = ref(false);
const selectedItem = ref<CartItem | null>(null);
const selectedItemIndex = ref(-1);
const discountValue = ref(0);
const paymentAmount = ref(0);
const change = ref(0);
const barcodeInputRef = ref<HTMLInputElement | null>(null);

// Event Handlers
const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItemIndex.value < 0 || selectedItemIndex.value >= cart.value.length) return;
    const item = cart.value[selectedItemIndex.value];
    if (!item) return;

    switch (e.key) {
        case 'F2':
            e.preventDefault();
            removeItem(item.barcode);
            if (selectedItemIndex.value > 0) selectedItemIndex.value--;
            break;
        case 'F4':
            e.preventDefault();
            openDiscountDialog(item);
            break;
        case 'ArrowUp':
            if (selectedItemIndex.value > 0) {
                e.preventDefault();
                selectedItemIndex.value--;
            }
            break;
        case 'ArrowDown':
            if (selectedItemIndex.value < cart.value.length - 1) {
                e.preventDefault();
                selectedItemIndex.value++;
            }
            break;
    }
};

const selectItem = (index: number) => {
    selectedItemIndex.value = index;
};

const openDiscountDialog = (item: CartItem) => {
    selectedItem.value = item;
    discountValue.value = item.discount;
    showDiscountDialog.value = true;
};

const applyDiscountToItem = () => {
    if (selectedItem.value) {
        applyDiscount(selectedItem.value.barcode, discountValue.value);
        showDiscountDialog.value = false;
        showToast('success', 'Desconto Aplicado', `Desconto de ${formatCurrency(discountValue.value)} aplicado com sucesso!`);
    }
};

const processPayment = () => {
    if (paymentAmount.value >= subtotal.value) {
        const changeValue = paymentAmount.value - subtotal.value;
        showToast('success', 'Pagamento Efetuado',
            `Pagamento de ${formatCurrency(paymentAmount.value)} recebido. Troco: ${formatCurrency(changeValue)}`);

        setTimeout(() => {
            clearCart();
            showPaymentDialog.value = false;
            paymentAmount.value = 0;
            focusBarcodeInput();
        }, 1000);
    }
};

// Helpers
const showToast = (severity: string, summary: string, detail: string) => {
    toast.add({ severity, summary, detail, life: 3000 });
};

const focusBarcodeInput = () => {
    barcodeInputRef.value?.focus();
};

const handleDiscountDialogVisibility = (isVisible: boolean): void => {
    showDiscountDialog.value = isVisible;
};
const handlePaymentDialogVisibility = (isVisible: boolean): void => {
    showPaymentDialog.value = isVisible;
};
const updateDiscountValue = (value: number): void => {
    discountValue.value = value;
};
const updatePaymentAmount = (amount: number): void => {
    paymentAmount.value = amount;
};

// Lifecycle
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    focusBarcodeInput();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

// Watchers
watch(paymentAmount, (newVal) => {
    change.value = Math.max(0, newVal - subtotal.value);
});

watch(errorMessage, (msg) => msg && showToast('error', 'Erro', msg));
watch(successMessage, (msg) => msg && showToast('success', 'Sucesso', msg));
</script>

<template>
    <div class="admin-layout">
        <div class="content-area">
            <header class="header">
                <div class="flex items-center gap-4">
                    <h1 class="text-xl font-semibold">PDV - Ponto de Venda</h1>
                </div>
            </header>

            <div class="main-content">
                <main class="main">
                    <div class="pdv-container">
                        <!-- Barcode Input -->
                        <div class="form-section">
                            <div class="form-grid">
                                <div class="form-field form-field-12">
                                    <label class="form-label">Código de Barras</label>
                                    <InputText id="barcode" v-model="barcodeInput" @keyup.enter="processBarcodeInput"
                                        @keyup="handleBarcodeInput" ref="barcodeInputRef"
                                        placeholder="Passe o código de barras ou digite e pressione Enter" />
                                </div>
                            </div>
                        </div>

                        <!-- Product List -->
                        <div class="product-list">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-left border-b border-gray-200 dark:border-gray-700">
                                            <th class="p-3">Produto</th>
                                            <th class="p-3 text-right">Preço</th>
                                            <th class="p-3 text-center">Qtd</th>
                                            <th class="p-3 text-right">Desconto</th>
                                            <th class="p-3 text-right">Subtotal</th>
                                            <th class="p-3 text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in cart" :key="item.barcode" :class="[
                                            'border-b border-gray-100 dark:border-gray-700',
                                            { 'bg-blue-50 dark:bg-blue-900/30': selectedItemIndex === index }
                                        ]" @click="selectItem(index)">
                                            <td class="p-3">{{ item.name }}</td>
                                            <td class="p-3 text-right">{{ formatCurrency(item.price) }}</td>
                                            <td class="p-3">
                                                <div class="flex items-center justify-center">
                                                    <InputNumber v-model="item.quantity" :min="1" show-buttons
                                                        button-layout="horizontal"
                                                        @change="(e: any) => updateQuantity(item.barcode, e.value)"
                                                        class="w-24" />
                                                </div>
                                            </td>
                                            <td class="p-3 text-right">
                                                <span class="cursor-pointer hover:underline"
                                                    @click.stop="openDiscountDialog(item)">
                                                    {{ formatCurrency(item.discount) }}
                                                </span>
                                            </td>
                                            <td class="p-3 text-right">
                                                {{ formatCurrency((item.price * item.quantity) - item.discount) }}
                                            </td>
                                            <td class="p-3 text-center">
                                                <Button icon="pi pi-trash"
                                                    class="p-button-text p-button-danger p-button-sm"
                                                    @click.stop="removeItem(item.barcode)" />
                                            </td>
                                        </tr>
                                        <tr v-if="cart.length === 0">
                                            <td colspan="6" class="p-4 text-center text-gray-500">
                                                Nenhum produto adicionado
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Order Summary Sidebar -->
                <aside class="order-summary">
                    <div class="summary-header">
                        <h3>Resumo da Venda</h3>
                    </div>
                    <div class="summary-content">
                        <div class="summary-row">
                            <span>Itens:</span>
                            <span class="summary-value">{{ totalItems }}</span>
                        </div>
                        <div class="summary-total">
                            <span>Total:</span>
                            <span class="total-amount">{{ formatCurrency(subtotal) }}</span>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <Button label="Finalizar Venda" icon="pi pi-credit-card" class="p-button-success w-full mb-2"
                            :disabled="cart.length === 0" @click="showPaymentDialog = true" />
                        <Button label="Cancelar Venda" icon="pi pi-times"
                            class="p-button-outlined p-button-secondary w-full" :disabled="cart.length === 0"
                            @click="clearCart" />
                    </div>
                </aside>
            </div>
        </div>
    </div>

    <DiscountDialog :model-value="showDiscountDialog" @update:model-value="handleDiscountDialogVisibility"
        :item="selectedItem" :discount-value="discountValue" @update:discount-value="updateDiscountValue"
        @apply="applyDiscountToItem" />
    <PaymentDialog :model-value="showPaymentDialog" @update:model-value="handlePaymentDialogVisibility"
        :subtotal="subtotal" :payment-amount="paymentAmount" :change="change"
        @update:payment-amount="updatePaymentAmount" @process-payment="processPayment" />

    <Toast />
</template>

<style scoped>
@import "tailwindcss";

.form-section {
    @apply mb-4 pb-4 border-b border-gray-200 dark:border-gray-700;
}

.form-section:last-of-type {
    @apply border-b-0;
}

.section-title {
    @apply text-lg font-semibold -mt-6 -mx-6 mb-6 px-6 py-3 text-gray-900 dark:text-white;
    background-color: var(--color-gray-800);
    border-bottom: 1px solid var(--color-gray-700);
}

.form-grid {
    @apply grid grid-cols-12 gap-4;
}

.form-field {
    @apply flex flex-col gap-2;
}

.form-field-12 {
    @apply col-span-12;
}

.admin-layout {
    @apply flex w-screen h-screen p-4 gap-4 overflow-hidden;
}

.content-area {
    @apply flex-1 flex flex-col overflow-hidden rounded-lg;
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow);
}

.header {
    @apply flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0;
    background-color: var(--color-bg-primary);
}

.main-content {
    @apply flex flex-1 overflow-hidden;
}

.main {
    @apply flex-1 overflow-y-auto p-6;
    background-color: var(--color-bg-secondary);
}

.order-summary {
    @apply w-80 flex flex-col h-full border-l border-gray-200 dark:border-gray-700;
    background-color: var(--color-bg-primary);
}

.pdv-container {
    @apply flex-1 flex flex-col gap-6;
}

.summary-header {
    @apply p-4 border-b border-gray-200 dark:border-gray-700;
}

.summary-header h3 {
    @apply m-0 text-lg font-semibold text-gray-900 dark:text-white;
}

.summary-content {
    @apply p-6 flex-1 flex flex-col gap-4;
}

.summary-row {
    @apply flex justify-between items-center text-gray-600 dark:text-gray-400;
}

.summary-value {
    @apply font-medium text-gray-900 dark:text-white;
}

.summary-total {
    @apply mt-4 pt-4 flex justify-between items-center font-semibold text-lg border-t border-gray-200 dark:border-gray-700;
}

.total-amount {
    @apply text-xl;
    color: var(--primary-color);
}

.summary-actions {
    @apply p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    @apply w-1.5 h-1.5;
}

::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800 rounded;
}

::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500;
}

/* Product list styles */
.product-list {
    @apply mt-6;
}

.product-list table {
    @apply w-full border-collapse;
}

.product-list th {
    @apply bg-gray-100 dark:bg-gray-800 text-left;
}

.product-list tr {
    @apply hover:bg-gray-50 dark:hover:bg-gray-800/50;
}

.product-list td,
.product-list th {
    @apply p-3 border-b border-gray-200 dark:border-gray-700;
}
</style>
