<script setup lang="ts">
import Password from 'primevue/password'

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    toggleMask: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div class="m-password-wrapper">
        <Password v-bind="$attrs" :class="['m-password', props.class]" :toggleMask="props.toggleMask"
            :feedback="false" />
    </div>
</template>

<style>
@import "tailwindcss";

.m-password-wrapper .p-password {
    width: 100%;
}

.m-password-wrapper .p-password-input {
    width: 100% !important;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    background-color: var(--color-gray-200) !important;
    border: 1px solid var(--color-gray-300) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
}

.m-password-wrapper .p-password-input:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-password-wrapper .p-password-input:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

.m-password-wrapper .p-password.p-invalid .p-password-input {
    border-color: #f87171 !important;
}

.m-password-wrapper .p-password.p-invalid .p-password-input:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}

.p-password-mask-icon {
    color: var(--color-primary) !important;
}

.p-password-unmask-icon {
    color: var(--color-primary) !important;
}
</style>
