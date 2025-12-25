<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { usePDV, type CartItem } from '../composables/usePDV';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
import IconUser from '@/assets/Icons/IconUser.vue';
import MInputText from '@/components/MInputText.vue';

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
    clearCart
} = usePDV();

// Refs for dialogs
const showDiscountDialog = ref(false);
const showPaymentDialog = ref(false);
const selectedItem = ref<CartItem | null>(null);
const selectedItemIndex = ref<number>(-1);
const discountValue = ref(0);
const paymentAmount = ref(0);
const change = ref(0);

// Keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItemIndex.value < 0 || selectedItemIndex.value >= cart.value.length) return;

    const selectedItem = cart.value[selectedItemIndex.value];
    if (!selectedItem) return;

    if (e.key === 'F2') {
        e.preventDefault();
        removeItem(selectedItem.barcode);
        if (selectedItemIndex.value > 0) {
            selectedItemIndex.value--;
        }
    } else if (e.key === 'F4') {
        e.preventDefault();
        openDiscountDialog(selectedItem);
    } else if (e.key === 'ArrowUp' && selectedItemIndex.value > 0) {
        e.preventDefault();
        selectedItemIndex.value--;
    } else if (e.key === 'ArrowDown' && selectedItemIndex.value < cart.value.length - 1) {
        e.preventDefault();
        selectedItemIndex.value++;
    }
};

// Select item by index
const selectItem = (index: number) => {
    selectedItemIndex.value = index;
};


onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    barcodeInputRef.value?.focus();
});

// Clean up event listeners
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

// Focus barcode input on mount
const barcodeInputRef = ref<HTMLInputElement | null>(null);
onMounted(() => {
    barcodeInputRef.value?.focus();
});

// Watch for error and success messages to show toasts
watch(errorMessage, (newVal) => {
    if (newVal) {
        toast.add({ severity: 'error', summary: 'Erro', detail: newVal, life: 3000 });
    }
});

watch(successMessage, (newVal) => {
    if (newVal) {
        toast.add({ severity: 'success', summary: 'Sucesso', detail: newVal, life: 2000 });
    }
});

// Open discount dialog for a specific item
function openDiscountDialog(item: CartItem) {
    selectedItem.value = item;
    discountValue.value = item.discount;
    showDiscountDialog.value = true;
}

// Apply discount to selected item
function applyDiscountToItem() {
    if (selectedItem.value) {
        applyDiscount(selectedItem.value.barcode, discountValue.value);
        showDiscountDialog.value = false;
        toast.add({
            severity: 'success',
            summary: 'Desconto Aplicado',
            detail: `Desconto de R$ ${discountValue.value.toFixed(2)} aplicado com sucesso!`,
            life: 2000
        });
    }
}

// Calculate change when payment amount changes
watch(paymentAmount, (newVal) => {
    change.value = Math.max(0, newVal - subtotal.value);
});

// Process payment
function processPayment() {
    if (paymentAmount.value >= subtotal.value) {
        // In a real app, you would process the payment here
        toast.add({
            severity: 'success',
            summary: 'Pagamento Efetuado',
            detail: `Pagamento de R$ ${paymentAmount.value.toFixed(2)} recebido. Troco: R$ ${change.value.toFixed(2)}`,
            life: 5000
        });

        // Clear cart and close dialog after a short delay
        setTimeout(() => {
            clearCart();
            showPaymentDialog.value = false;
            paymentAmount.value = 0;
            barcodeInputRef.value?.focus();
        }, 1000);
    }
}

// Format currency
function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
</script>

<template>
    <div class="admin-layout">
        <div class="content-area">
            <header class="header">
                <h4 class="mb-0">PDV - Ponto de Venda</h4>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <IconUser :width="32" :height="32" />
                    </div>
                </div>
            </header>
            <div class="main-content">
                <main class="main">
                    <!-- Barcode Input -->
                    <div class="form-section">
                        <div class="form-grid">
                            <div class="form-field form-field-12">
                                <label class="form-label">Código de Barras</label>
                                <MInputText id="barcode" v-model="barcodeInput" placeholder="Digite algo..."
                                    @keyup.enter="processBarcodeInput" />
                            </div>
                        </div>
                    </div>

                    <!-- Cart Items -->
                    <div class="cart-items bg-white rounded-lg shadow overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead class="bg-gray-50">
                                    <tr class="text-xs text-gray-500 uppercase">
                                        <th class="px-4 py-2 text-left">Produto</th>
                                        <th class="px-2 py-2 text-right">Preço</th>
                                        <th class="px-2 py-2 text-center">Qtd</th>
                                        <th class="px-2 py-2 text-right">Total</th>
                                        <th class="w-24"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="cart.length === 0">
                                        <td colspan="5" class="px-4 py-8 text-center text-gray-400">
                                            Nenhum item adicionado. Passe o código de barras para começar.
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in cart" :key="item.barcode"
                                        class="border-t border-gray-100 hover:bg-gray-50"
                                        :class="{ 'bg-blue-50': selectedItemIndex === index }"
                                        @click="selectItem(index)">
                                        <td class="px-4 py-3">
                                            <div class="font-medium text-gray-900">{{ item.name }}</div>
                                            <div class="text-xs text-gray-500">{{ item.barcode }}</div>
                                        </td>
                                        <td class="px-2 py-3 text-right text-gray-700">
                                            {{ formatCurrency(item.price) }}
                                        </td>
                                        <td class="px-2 py-3 text-center">
                                            <div class="inline-flex items-center border rounded">
                                                <button @click.stop="updateQuantity(item.barcode, item.quantity - 1)"
                                                    class="px-2 py-1 text-gray-600 hover:bg-gray-100">
                                                    -
                                                </button>
                                                <span class="w-8 text-center">{{ item.quantity }}</span>
                                                <button @click.stop="updateQuantity(item.barcode, item.quantity + 1)"
                                                    class="px-2 py-1 text-gray-600 hover:bg-gray-100">
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td class="px-2 py-3 text-right font-medium text-gray-900">
                                            {{ formatCurrency((item.price * item.quantity) - item.discount) }}
                                        </td>
                                        <td class="px-2 py-3 text-right">
                                            <div class="flex justify-end space-x-1">
                                                <button @click.stop="openDiscountDialog(item)"
                                                    class="p-1 text-blue-600 rounded hover:bg-blue-100"
                                                    title="Desconto (F4)">
                                                    <i class="pi pi-percentage text-sm"></i>
                                                </button>
                                                <button @click.stop="removeItem(item.barcode)"
                                                    class="p-1 text-red-600 rounded hover:bg-red-100"
                                                    title="Remover (F2)">
                                                    <i class="pi pi-trash text-sm"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

            <aside>

                <!-- Discount Dialog -->
                <Dialog v-model:visible="showDiscountDialog" header="Aplicar Desconto" :modal="true"
                    :style="{ width: '450px' }">
                    <div class="p-fluid">
                        <div class="mb-4">
                            <label for="discountValue" class="block text-sm font-medium text-gray-700 mb-2">
                                Valor do Desconto (R$)
                            </label>
                            <InputNumber id="discountValue" v-model="discountValue" :min="0"
                                :max="selectedItem ? selectedItem.price * selectedItem.quantity : 0" mode="currency"
                                currency="BRL" locale="pt-BR" class="w-full" />
                            <small class="text-gray-500">
                                Máximo: {{ selectedItem ? formatCurrency(selectedItem.price * selectedItem.quantity) :
                                    'R$ 0,00' }}
                            </small>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text"
                            @click="showDiscountDialog = false" />
                        <Button label="Aplicar" icon="pi pi-check" class="p-button-success"
                            @click="applyDiscountToItem" />
                    </template>
                </Dialog>

                <!-- Payment Dialog -->
                <Dialog v-model:visible="showPaymentDialog" header="Finalizar Venda" :modal="true"
                    :style="{ width: '500px' }">
                    <div class="p-fluid">
                        <div class="mb-6">
                            <div class="text-xl font-bold mb-2">Total a Pagar:</div>
                            <div class="text-3xl font-bold text-primary-600 mb-6">{{ formatCurrency(subtotal) }}</div>

                            <div class="mb-4">
                                <label for="paymentAmount" class="block text-sm font-medium text-gray-700 mb-2">
                                    Valor Recebido (R$)
                                </label>
                                <InputNumber id="paymentAmount" v-model="paymentAmount" :min="0" mode="currency"
                                    currency="BRL" locale="pt-BR" class="w-full text-2xl" autofocus />
                            </div>

                            <div v-if="paymentAmount > 0" class="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div class="flex justify-between text-lg font-medium mb-2">
                                    <span>Troco:</span>
                                    <span :class="{ 'text-red-500': change < 0, 'text-green-600': change >= 0 }">
                                        {{ formatCurrency(Math.abs(change)) }}
                                        <span v-if="change < 0" class="text-sm">(valor insuficiente)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text"
                            @click="showPaymentDialog = false" />
                        <Button label="Confirmar Pagamento" icon="pi pi-check" class="p-button-success"
                            :disabled="paymentAmount < subtotal" @click="processPayment" />
                    </template>
                </Dialog>

            </aside>
        </div>
    </div>

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

/* Form Grid */
.form-grid {
    @apply grid grid-cols-12 gap-4;
}

.form-field {
    @apply flex flex-col gap-2;
}

.form-field-12 {
    @apply col-span-12;
}

/* Input Styles */
:deep(.p-inputtext) {
    @apply w-full py-2 px-4 rounded-lg outline-none transition-all duration-200;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-700);
    color: var(--color-text-primary);
}

:deep(.p-inputtext:focus) {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
}

.form-label {
    @apply text-sm font-medium;
    color: var(--p-text-color);
}

/* Admin Layout Styles */
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
</style>
