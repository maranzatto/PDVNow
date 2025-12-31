<script setup lang="ts">
import InputText from 'primevue/inputtext'

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    }
})
</script>

<template>
    <div class="m-input-wrapper">
        <InputText v-bind="$attrs" :class="['m-input', props.class]" />
    </div>
</template>

<style>
.m-input-wrapper .p-inputtext {
    width: 100% !important;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    background-color: var(--color-gray-200) !important;
    border: 1px solid var(--color-gray-300) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
}

.m-input-wrapper .p-inputtext:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-input-wrapper .p-inputtext:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

.m-input-wrapper .p-inputtext.p-invalid {
    border-color: #f87171 !important;
}

.m-input-wrapper .p-inputtext.p-invalid:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
