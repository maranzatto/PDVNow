<script setup lang="ts">
import { ref, watch } from 'vue'
import InputNumber from 'primevue/inputnumber'

defineOptions({
    inheritAttrs: false
})

const props = withDefaults(defineProps<{
    modelValue?: number | null
    locale?: string
    min?: number
    max?: number
    invalid?: boolean
}>(), {
    modelValue: null,
    locale: 'pt-BR',
    min: 0,
    invalid: false
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void
}>()

const internalValue = ref<number | null>(props.modelValue ?? null)

watch(() => props.modelValue, (newVal) => {
    if (newVal !== internalValue.value) {
        internalValue.value = newVal ?? 0
    }
}, { immediate: true })

watch(internalValue, (newVal) => {
    emit('update:modelValue', newVal ?? 0)
})
</script>

<template>
    <div class="m-input-wrapper">
        <InputNumber v-bind="$attrs" v-model="internalValue" :class="['m-input', { 'p-invalid': invalid }]"
            :minFractionDigits="2" :maxFractionDigits="2" mode="currency" currency="BRL" :locale="locale"
            :useGrouping="true" inputmode="decimal" :pt="{
                root: { class: 'w-full' },
                input: { class: 'w-full' }
            }" />
    </div>
</template>

<style>
.m-input-wrapper .p-inputnumber {
    width: 100% !important;
}

.m-input-wrapper .p-inputnumber-input {
    width: 100% !important;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    background-color: var(--color-gray-200) !important;
    border: 1px solid var(--color-gray-300) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
}

.m-input-wrapper .p-inputnumber:not(.p-disabled):hover .p-inputnumber-input {
    border-color: var(--color-gray-400) !important;
}

.m-input-wrapper .p-inputnumber:not(.p-disabled).p-inputnumber-focus .p-inputnumber-input,
.m-input-wrapper .p-inputnumber:not(.p-disabled) .p-inputnumber-input:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-input-wrapper .p-inputnumber.p-invalid .p-inputnumber-input {
    border-color: #f87171 !important;
}

.m-input-wrapper .p-inputnumber.p-invalid .p-inputnumber-input:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}

.m-input-wrapper .p-inputnumber.p-disabled,
.m-input-wrapper .p-inputnumber-input:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

/* Estilo para os botões de incremento/decremento */
.m-input-wrapper .p-inputnumber-button {
    background-color: var(--color-gray-200) !important;
    border-color: var(--color-gray-300) !important;
    color: var(--color-text-secondary) !important;
}

.m-input-wrapper .p-inputnumber-button:hover {
    background-color: var(--color-gray-300) !important;
}

.m-input-wrapper .p-inputnumber-button:focus {
    box-shadow: none !important;
}
</style>
