<script setup lang="ts">
import Checkbox from 'primevue/checkbox'

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    binary: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="m-checkbox-wrapper">
        <Checkbox v-bind="$attrs" :model-value="modelValue" :binary="binary" :class="['m-checkbox', props.class]"
            @update:model-value="(val) => emit('update:modelValue', val)" />
        <label v-if="label" class="m-checkbox-label">{{ label }}</label>
    </div>
</template>

<style>
.m-checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.m-checkbox-label {
    color: var(--color-text-primary);
    cursor: pointer;
}

.m-checkbox .p-checkbox .p-checkbox-box {
    border: 2px solid var(--color-gray-700) !important;
    background: var(--color-bg-secondary) !important;
    width: 1.25rem !important;
    height: 1.25rem !important;
    border-radius: 0.25rem !important;
    transition: all 0.2s ease-in-out !important;
}

.m-checkbox .p-checkbox .p-checkbox-box.p-highlight {
    background: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
}

.m-checkbox .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
    border-color: var(--color-primary) !important;
}

.m-checkbox .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
    box-shadow: 0 0 0 1px var(--color-primary) !important;
    border-color: var(--color-primary) !important;
}

.m-checkbox .p-checkbox .p-checkbox-box .p-checkbox-icon {
    color: white !important;
    font-size: 0.75rem !important;
}

.m-checkbox .p-checkbox.p-invalid>.p-checkbox-box {
    border-color: #f87171 !important;
}

.m-checkbox .p-checkbox:not(.p-checkbox-disabled).p-checkbox-invalid .p-checkbox-box:hover {
    border-color: #f87171 !important;
}

/* ===== CHECKBOX ===== */
.p-checkbox {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
}

.p-checkbox-box {
    width: 1.25rem !important;
    height: 1.25rem !important;
    border: 1px solid var(--color-gray-700) !important;
    background: var(--color-bg-primary) !important;
    border-radius: 0.375rem !important;
    transition: all 0.2s ease-in-out !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.p-checkbox-box:hover {
    border-color: var(--color-primary) !important;
}

.p-checkbox-box.p-focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
    outline: none !important;
}

.p-checkbox-box.p-checked {
    background: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
}

.p-checkbox-icon {
    font-size: 0.75rem !important;
    color: white !important;
}
</style>
