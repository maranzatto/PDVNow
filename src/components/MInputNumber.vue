<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    modelValue: {
        type: Number,
        default: null
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="m-input-wrapper">
        <InputNumber v-bind="$attrs" :model-value="modelValue" :class="['m-input', props.class]"
            @update:model-value="(val) => emit('update:modelValue', val)" />
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

.m-input-wrapper .p-inputnumber-input:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-input-wrapper .p-inputnumber-input:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

.m-input-wrapper .p-inputnumber-input.p-invalid {
    border-color: #f87171 !important;
}

.m-input-wrapper .p-inputnumber-input.p-invalid:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
