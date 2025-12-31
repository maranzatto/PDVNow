<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { usePDV, type CartItem } from '../composables/usePDV';
import Button from 'primevue/button';
import MButton from '@/components/MButton.vue';
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

const showDiscountDialog = ref(false);
const showPaymentDialog = ref(false);
const selectedItem = ref<CartItem | null>(null);
const selectedItemIndex = ref<number>(-1);
const discountValue = ref(0);
const paymentAmount = ref(0);
const change = ref(0);
const barcodeInputRef = ref<HTMLInputElement | null>(null);

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

const selectItem = (index: number) => {
    selectedItemIndex.value = index;
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    barcodeInputRef.value?.focus();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

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

watch(paymentAmount, (newVal) => {
    change.value = Math.max(0, newVal - subtotal.value);
});

function openDiscountDialog(item: CartItem) {
    selectedItem.value = item;
    discountValue.value = item.discount;
    showDiscountDialog.value = true;
}

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

function processPayment() {
    if (paymentAmount.value >= subtotal.value) {
        toast.add({
            severity: 'success',
            summary: 'Pagamento Efetuado',
            detail: `Pagamento de R$ ${paymentAmount.value.toFixed(2)} recebido. Troco: R$ ${change.value.toFixed(2)}`,
            life: 5000
        });

        setTimeout(() => {
            clearCart();
            showPaymentDialog.value = false;
            paymentAmount.value = 0;
            barcodeInputRef.value?.focus();
        }, 1000);
    }
}

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
                <h4 class="header-title">PDV - Ponto de Venda</h4>
                <div class="header-user">
                    <IconUser :width="32" :height="32" />
                </div>
            </header>

            <div class="main-content">
                <main class="main">
                    <!-- Barcode Input -->
                    <div class="form-section">
                        <div class="form-grid">
                            <div class="form-field-full">
                                <label class="form-label">Código de Barras</label>
                                <MInputText id="barcode" v-model="barcodeInput" placeholder="Digite algo..."
                                    @keyup.enter="processBarcodeInput" />
                            </div>
                        </div>
                    </div>

                    <!-- Cart Items -->
                    <div class="cart-container">
                        <div class="cart-table-wrapper">
                            <table class="cart-table">
                                <thead class="cart-thead">
                                    <tr class="cart-thead-row">
                                        <th class="cart-th cart-th-left">Produto</th>
                                        <th class="cart-th cart-th-right">Preço</th>
                                        <th class="cart-th cart-th-center">Qtd</th>
                                        <th class="cart-th cart-th-right">Total</th>
                                        <th class="cart-th-actions"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="cart.length === 0">
                                        <td colspan="5" class="cart-empty">
                                            Nenhum item adicionado. Passe o código de barras para começar.
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in cart" :key="item.barcode" class="cart-row"
                                        :class="{ 'cart-row-selected': selectedItemIndex === index }"
                                        @click="selectItem(index)">
                                        <td class="cart-td-product">
                                            <div class="product-name">{{ item.name }}</div>
                                            <div class="product-barcode">{{ item.barcode }}</div>
                                        </td>
                                        <td class="cart-td-price">
                                            {{ formatCurrency(item.price) }}
                                        </td>
                                        <td class="cart-td-quantity">
                                            <div class="quantity-control">
                                                <button @click.stop="updateQuantity(item.barcode, item.quantity - 1)"
                                                    class="quantity-btn">
                                                    -
                                                </button>
                                                <span class="quantity-value">{{ item.quantity }}</span>
                                                <button @click.stop="updateQuantity(item.barcode, item.quantity + 1)"
                                                    class="quantity-btn">
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td class="cart-td-total">
                                            {{ formatCurrency((item.price * item.quantity) - item.discount) }}
                                        </td>
                                        <td class="cart-td-actions">
                                            <div class="action-buttons">
                                                <button @click.stop="openDiscountDialog(item)"
                                                    class="action-btn action-btn-discount" title="Desconto (F4)">
                                                    <i class="pi pi-percentage"></i>
                                                </button>
                                                <button @click.stop="removeItem(item.barcode)"
                                                    class="action-btn action-btn-remove" title="Remover (F2)">
                                                    <i class="pi pi-trash"></i>
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
                        <MButton label="Finalizar Venda" icon="pi pi-credit-card" class="p-button-primary"
                            :disabled="cart.length === 0" @click="showPaymentDialog = true" />
                        <MButton label="Cancelar Venda" icon="pi pi-times" class="p-button-secondary"
                            :disabled="cart.length === 0" @click="clearCart" />
                    </div>
                </aside>
            </div>

            <!-- Discount Dialog -->
            <Dialog v-model:visible="showDiscountDialog" header="Aplicar Desconto" :modal="true"
                class="dialog-discount">
                <div class="dialog-content">
                    <div class="dialog-field">
                        <label for="discountValue" class="dialog-label">
                            Valor do Desconto (R$)
                        </label>
                        <InputNumber id="discountValue" v-model="discountValue" :min="0"
                            :max="selectedItem ? selectedItem.price * selectedItem.quantity : 0" mode="currency"
                            currency="BRL" locale="pt-BR" class="dialog-input" />
                        <small class="dialog-hint">
                            Máximo: {{ selectedItem ? formatCurrency(selectedItem.price * selectedItem.quantity) : `R$
                            0,00` }}
                        </small>
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-text"
                        @click="showDiscountDialog = false" />
                    <Button label="Aplicar" icon="pi pi-check" class="p-button-success" @click="applyDiscountToItem" />
                </template>
            </Dialog>

            <!-- Payment Dialog -->
            <Dialog v-model:visible="showPaymentDialog" header="Finalizar Venda" :modal="true" class="dialog-payment">
                <div class="dialog-content">
                    <div class="payment-info">
                        <div class="payment-label">Total a Pagar:</div>
                        <div class="payment-total">{{ formatCurrency(subtotal) }}</div>

                        <div class="dialog-field">
                            <label for="paymentAmount" class="dialog-label">
                                Valor Recebido (R$)
                            </label>
                            <InputNumber id="paymentAmount" v-model="paymentAmount" :min="0" mode="currency"
                                currency="BRL" locale="pt-BR" class="dialog-input payment-input" autofocus />
                        </div>

                        <div v-if="paymentAmount > 0" class="change-info">
                            <div class="change-row">
                                <span>Troco:</span>
                                <span class="change-value"
                                    :class="{ 'change-negative': change < 0, 'change-positive': change >= 0 }">
                                    {{ formatCurrency(Math.abs(change)) }}
                                    <span v-if="change < 0" class="change-insufficient">(valor insuficiente)</span>
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
        </div>
    </div>

    <Toast />
</template>

<style scoped>
@import "tailwindcss";

/* Form Section */
.form-section {
    @apply mb-4 pb-4 border-b border-gray-200 dark:border-gray-300;
}

.form-grid {
    @apply grid grid-cols-12 gap-4;
}

.form-field-full {
    @apply col-span-12 flex flex-col gap-2;
}

.form-label {
    @apply text-sm font-medium;
    color: var(--color-text-primary);
}

/* Admin Layout */
.admin-layout {
    @apply flex w-screen h-screen p-4 gap-4 overflow-hidden;
}

.content-area {
    @apply flex-1 flex flex-col overflow-hidden rounded-lg;
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow);
}

/* Header */
.header {
    @apply flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-300 shrink-0;
    background-color: var(--color-bg-primary);
}

.header-title {
    @apply mb-0;
}

.header-user {
    @apply flex items-center gap-2;
}

/* Main Content */
.main-content {
    @apply flex flex-1 overflow-hidden;
}

.main {
    @apply flex-1 overflow-y-auto p-6;
    background-color: var(--color-bg-secondary);
}

/* Cart Table */
.cart-container {
    @apply bg-white rounded-lg shadow overflow-hidden;
}

.cart-table-wrapper {
    @apply overflow-x-auto;
}

.cart-table {
    @apply min-w-full;
}

.cart-thead {
    @apply bg-gray-50;
}

.cart-thead-row {
    @apply text-xs text-gray-500 uppercase;
}

.cart-th {
    @apply px-2 py-2;
}

.cart-th-left {
    @apply px-4 text-left;
}

.cart-th-right {
    @apply text-right;
}

.cart-th-center {
    @apply text-center;
}

.cart-th-actions {
    @apply w-24;
}

.cart-empty {
    @apply px-4 py-8 text-center text-gray-400;
}

.cart-row {
    @apply border-t border-gray-100 hover:bg-gray-50 cursor-pointer;
}

.cart-row-selected {
    @apply bg-blue-50;
}

.cart-td-product {
    @apply px-4 py-3;
}

.product-name {
    @apply font-medium text-gray-900;
}

.product-barcode {
    @apply text-xs text-gray-500;
}

.cart-td-price {
    @apply px-2 py-3 text-right font-semibold;
    color: var(--color-text-primary) !important
}

.cart-td-quantity {
    @apply px-2 py-3 text-center;
}

.quantity-control {
    @apply inline-flex items-center border rounded-lg overflow-hidden;
    border-color: var(--color-gray-200);
    background-color: var(--color-white);
}

.quantity-btn {
    @apply px-3 py-2 font-medium;
    color: var(--color-gray-700);
    background: var(--color-gray-50);
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
}

.quantity-btn:hover {
    background-color: var(--color-gray-200);
    color: var(--color-primary);
}

.quantity-btn:active {
    background-color: var(--color-gray-300);
    transform: scale(0.95);
}

.quantity-value {
    @apply text-center font-semibold;
    min-width: 3rem;
    padding: 0.5rem;
    color: var(--color-text-primary);
    font-size: 1rem;
    background-color: var(--color-white);
}

.cart-td-total {
    @apply px-2 py-3 text-right font-semibold;
    color: var(--color-text-primary) !important
}

.cart-td-actions {
    @apply px-2 py-3 text-right;
}

.action-buttons {
    @apply flex justify-end;
    gap: 0.5rem;
}

.action-btn {
    @apply p-2 rounded-lg;
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-btn i {
    @apply text-base;
}

.action-btn-discount {
    color: var(--color-primary);
    border-color: var(--color-primary-200);
    background-color: var(--color-primary-50);
}

.action-btn-discount:hover {
    background-color: var(--color-primary-100);
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

.action-btn-remove {
    color: var(--color-error);
    border-color: #fecaca;
    background-color: #fef2f2;
}

.action-btn-remove:hover {
    background-color: #fee2e2;
    border-color: var(--color-error);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

/* Order Summary */
.order-summary {
    @apply w-80 flex flex-col h-full border-l border-gray-200 dark:border-gray-300;
    background-color: var(--color-bg-primary);
}

.summary-header {
    @apply p-4 border-b border-gray-200 dark:border-gray-300;
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
    @apply mt-4 pt-4 flex justify-between items-center font-semibold text-lg border-t border-gray-200 dark:border-gray-300;
}

.total-amount {
    @apply text-xl;
    color: var(--primary-color);
}

.summary-actions {
    @apply p-6 border-t border-gray-200 dark:border-gray-300 flex flex-col gap-3;
}

.summary-btn-primary {
    @apply w-full mb-2;
}

.summary-btn-secondary {
    @apply w-full;
}

/* Dialogs */
.dialog-discount,
.dialog-payment {
    width: 450px;
}

.dialog-payment {
    width: 500px;
}

.dialog-field {
    @apply mb-4;
}

.dialog-label {
    @apply block text-sm font-medium text-gray-300 mb-2;
}

.dialog-input {
    @apply w-full;
}

.dialog-hint {
    @apply text-gray-500;
}

/* Payment Dialog */
.payment-info {
    @apply mb-6;
}

.payment-label {
    @apply text-xl font-bold mb-2;
}

.payment-total {
    @apply text-3xl font-bold mb-6;
}

.payment-input {
    @apply text-2xl;
}

.change-info {
    @apply mt-6 p-4 bg-gray-50 rounded-lg;
}

.change-row {
    @apply flex justify-between text-lg font-medium mb-2;
}

.change-value {
    @apply flex items-center gap-1;
}

.change-negative {
    @apply text-red-500;
}

.change-positive {
    @apply text-green-600;
}

.change-insufficient {
    @apply text-sm;
}
</style>
