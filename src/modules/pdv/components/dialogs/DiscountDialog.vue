<script setup lang="ts">
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

export interface CartItem {
    id: string;
    barcode: string;
    name: string;
    price: number;
    quantity: number;
    discount: number;
}

const props = defineProps<{
    modelValue: boolean;
    item: CartItem | null;
    discountValue: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'update:discountValue', value: number): void;
    (e: 'apply'): void;
}>();

const localDiscount = ref(props.discountValue);

watch(
    () => props.discountValue,
    (newVal) => {
        localDiscount.value = newVal;
    }
);

watch(localDiscount, (newVal) => {
    emit('update:discountValue', newVal);
});

const handleVisibilityChange = (visible: boolean) => {
    emit('update:modelValue', visible);
};

const applyDiscount = () => {
    emit('apply');
};
</script>

<template>
    <Dialog :visible="modelValue" header="Aplicar Desconto" :modal="true" :style="{ width: '450px' }"
        @update:visible="handleVisibilityChange">
        <div class="p-fluid">
            <div class="field">
                <label for="discount">Valor do Desconto (R$)</label>
                <InputNumber id="discount" v-model="localDiscount" mode="currency" currency="BRL" locale="pt-BR"
                    :min="0" :max="item ? item.price * item.quantity : 0" class="w-full" autofocus />
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="handleVisibilityChange(false)" />
            <Button label="Aplicar" icon="pi pi-check" class="p-button-success" @click="applyDiscount" />
        </template>
    </Dialog>
</template>
