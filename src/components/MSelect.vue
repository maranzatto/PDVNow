<script setup lang="ts">
import { ref, computed } from 'vue'
import Select from 'primevue/select'

defineOptions({
    inheritAttrs: false,
    name: 'MSelect'
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    modelValue: {
        type: null,
        default: null
    },
    options: {
        type: Array,
        default: () => []
    },
    optionLabel: {
        type: String,
        default: 'label'
    },
    optionValue: {
        type: String,
        default: 'value'
    },
    placeholder: {
        type: String,
        default: 'Selecione uma opção'
    },
    invalid: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    showClear: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: ''
    },
    labelDataP: {
        type: Object,
        default: () => ({
            placeholder: false,
            clearable: false,
            disabled: false,
            empty: false
        })
    }
})

const emit = defineEmits(['update:modelValue'])

const focused = ref(false)

// Garantir que as opções sejam sempre um array
const safeOptions = computed(() => {
    if (!props.options) return []
    return Array.isArray(props.options) ? props.options : [props.options]
})

// Função para obter a classe baseada no tamanho
const getSizeClass = () => {
    if (!props.size) return ''
    return `p-${props.size}`
}

// Garantindo que labelDataP sempre tenha um valor válido
const safeLabelDataP = computed(() => ({
    placeholder: props.labelDataP?.placeholder || false,
    clearable: props.labelDataP?.clearable || false,
    disabled: props.labelDataP?.disabled || false,
    empty: props.labelDataP?.empty || false,
    ...(props.size && { [props.size]: true })
}))
</script>

<template>
    <div class="m-select-wrapper">
        <label v-if="label" class="m-select-label">{{ label }}</label>
        <Select v-bind="$attrs" :model-value="modelValue" :options="safeOptions" :option-label="optionLabel"
            :option-value="optionValue" :placeholder="placeholder" :show-clear="showClear" :disabled="disabled"
            :editable="editable" :class="['m-select', props.class, { 'p-invalid': invalid }, getSizeClass()]"
            :label-data-p="safeLabelDataP" @update:model-value="(val) => emit('update:modelValue', val)"
            @focus="focused = true" @blur="focused = false">
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <div>{{ slotProps.option[optionLabel] || slotProps.option.label || slotProps.option }}</div>
                </div>
            </template>
            <template #empty v-if="!safeOptions.length">
                Nenhuma opção disponível
            </template>
        </Select>
    </div>
</template>

<style>
.m-select-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.m-select-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
}

.m-select {
    width: 100%;
}

/* Estilo para o dropdown */
:deep(.p-dropdown) {
    width: 100%;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-700);
    transition: all 0.2s ease-in-out;
    border-radius: 0.5rem;
}

:deep(.p-dropdown:not(.p-disabled):hover) {
    border-color: var(--color-primary);
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
    box-shadow: 0 0 0 1px var(--color-primary);
    border-color: var(--color-primary);
}

:deep(.p-dropdown-panel) {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-700);
}

:deep(.p-dropdown-items .p-dropdown-item) {
    color: var(--color-text-primary);
}

:deep(.p-dropdown-items .p-dropdown-item.p-highlight) {
    background: var(--color-primary);
    color: white;
}

:deep(.p-dropdown:not(.p-disabled).p-invalid) {
    border-color: #f87171;
}

:deep(.p-dropdown:not(.p-disabled).p-invalid.p-focus) {
    box-shadow: 0 0 0 1px #f87171;
}

.m-select-wrapper .p-dropdown {
    width: 100%;
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    transition: all 0.2s ease-in-out !important;
    border-radius: 0.5rem !important;
}

.m-select-wrapper .p-dropdown .p-dropdown-label {
    color: var(--color-text-primary) !important;
    padding: 0.5rem 1rem !important;
}

.m-select-wrapper .p-dropdown:not(.p-disabled):hover {
    border-color: var(--color-gray-600) !important;
}

.m-select-wrapper .p-dropdown:not(.p-disabled).p-focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-select-wrapper .p-dropdown-panel {
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
}

.m-select-wrapper .p-dropdown-items .p-dropdown-item {
    color: var(--color-text-primary) !important;
}

.m-select-wrapper .p-dropdown-items .p-dropdown-item.p-highlight {
    background: var(--color-primary) !important;
    color: white !important;
}

.m-select-wrapper .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: var(--color-bg-tertiary) !important;
}

.m-select-wrapper .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    background: var(--color-primary) !important;
}

.m-select-wrapper .p-dropdown:not(.p-disabled).p-invalid {
    border-color: #f87171 !important;
}

.m-select-wrapper .p-dropdown:not(.p-disabled).p-invalid:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}


/* ===== SELECT/DROPDOWN ===== */
.p-dropdown,
.p-select {
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    border-radius: 0.5rem !important;
    transition: all 0.2s ease-in-out !important;
    width: 100% !important;
}

.p-dropdown:hover,
.p-select:hover {
    border-color: var(--color-primary) !important;
}

.p-dropdown:focus,
.p-dropdown.p-focus,
.p-select:focus,
.p-select.p-focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
    outline: none !important;
}

.p-dropdown .p-dropdown-label {
    background: transparent !important;
    border: none !important;
    color: var(--color-text-primary) !important;
    padding: 0.5rem 1rem !important;
}

.p-dropdown-panel {
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    color: var(--color-text-primary) !important;
}

.p-dropdown-items {
    padding: 0.5rem 0 !important;
}

.p-dropdown-item {
    color: var(--color-text-primary) !important;
    background: transparent !important;
    padding: 0.5rem 1rem !important;
}

.p-dropdown-item.p-highlight,
.p-select-option.p-selected,
.p-dropdown-item[aria-selected="true"],
.p-select-option[aria-selected="true"] {
    background: var(--color-primary) !important;
    color: white !important;
}

.p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
    background: var(--color-bg-tertiary) !important;
}

.p-dropdown-trigger {
    color: var(--color-text-primary) !important;
    background: transparent !important;
    width: 2.5rem !important;
}
</style>
