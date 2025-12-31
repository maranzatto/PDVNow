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

const safeOptions = computed(() => {
    if (!props.options) return []
    return Array.isArray(props.options) ? props.options : [props.options]
})

const getSizeClass = () => {
    if (!props.size) return ''
    return `p-${props.size}`
}

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
.m-select-wrapper .p-select {
    width: 100%;
    background-color: var(--color-gray-200) !important;
    border: 1px solid var(--color-gray-300) !important;
    border-radius: 0.5rem !important;
    transition: all 0.2s ease-in-out !important;
}

.m-select-wrapper .p-select-label {
    color: var(--color-text-primary) !important;
    padding: 0.5rem 1rem !important;
}

.m-select-wrapper .p-select-dropdown {
    color: var(--color-text-primary) !important;
    background: transparent !important;
    width: 2.5rem !important;
}

.m-select-wrapper .p-select:not(.p-disabled):hover {
    border-color: var(--color-primary) !important;
}

.m-select-wrapper .p-select:not(.p-disabled):focus,
.m-select-wrapper .p-select:not(.p-disabled).p-focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
    outline: none !important;
}

.m-select-wrapper .p-select:not(.p-disabled).p-invalid {
    border-color: #f87171 !important;
}

.m-select-wrapper .p-select:not(.p-disabled).p-invalid:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}

.p-select-overlay {
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
}

.p-select-list {
    padding: 0.5rem 0 !important;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary) !important;
}

.p-select-option {
    color: var(--color-text-primary) !important;
    background: transparent !important;
    padding: 0.5rem 1rem !important;
}

.p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
    background: var(--color-primary) !important;
    color: white !important;
}

.p-select-option.p-select-option-selected {
    background: var(--color-primary) !important;
    color: white !important;
}
</style>
