<script setup lang="ts">
import Textarea from 'primevue/textarea'

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    rows: {
        type: Number,
        default: 3
    },
    autoResize: {
        type: Boolean,
        default: true
    },
    placeholder: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="m-textarea-wrapper">
        <Textarea v-bind="$attrs" :model-value="modelValue" :rows="rows" :auto-resize="autoResize"
            :placeholder="placeholder" :class="['m-textarea', props.class]" :style="{ '--rows': rows }"
            @update:model-value="(val: string) => emit('update:modelValue', val)" />
    </div>
</template>

<style>
.m-textarea-wrapper {
    width: 100%;
}

.m-textarea-wrapper .p-textarea {
    width: 100% !important;
    min-height: 100px;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    background-color: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
    resize: vertical;
}

.m-textarea-wrapper .p-textarea:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-textarea-wrapper .p-textarea:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

.m-textarea-wrapper .p-textarea.p-invalid {
    border-color: #f87171 !important;
}

.m-textarea-wrapper .p-textarea.p-invalid:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
