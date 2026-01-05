<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type MaskType = 'phone' | 'cnpj' | 'cpf' | 'cep'

const props = defineProps<{
    modelValue: string | number
    maskType: MaskType
    placeholder?: string
    class?: string | Record<string, unknown> | unknown[]
    disabled?: boolean
    invalid?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref(props.modelValue?.toString() || '')

const maxLength = computed(() => {
    switch (props.maskType) {
        case 'phone':
            return 15 // (99) 99999-9999
        case 'cnpj':
            return 18 // 99.999.999/9999-99
        case 'cpf':
            return 14 // 999.999.999-99
        case 'cep':
            return 9 // 99999-999
        default:
            return 18
    }
})

const applyMask = (value: string, type: MaskType): string => {
    if (!value) return ''

    const onlyNumbers = value.replace(/\D/g, '')

    switch (type) {
        case 'phone':
            return formatPhone(onlyNumbers)
        case 'cnpj':
            return formatCnpj(onlyNumbers)
        case 'cpf':
            return formatCpf(onlyNumbers)
        case 'cep':
            return formatCep(onlyNumbers)
        default:
            return value
    }
}

const formatPhone = (value: string): string => {
    const maxLength = 11
    value = value.substring(0, maxLength)

    if (value.length <= 10) {
        return value
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    } else {
        return value
            .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4')
            .replace(/(-\d{4})\d+?$/, '$1')
    }
}

const formatCnpj = (value: string): string => {
    return value
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

const formatCpf = (value: string): string => {
    return value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

const formatCep = (value: string): string => {
    return value
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
}

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    let maskedValue = applyMask(target.value, props.maskType)

    if (maskedValue.length > maxLength.value) {
        maskedValue = maskedValue.substring(0, maxLength.value)
    }

    inputValue.value = maskedValue
    emit('update:modelValue', maskedValue.replace(/\D/g, ''))
}

watch(() => props.modelValue, (newValue) => {
    if (newValue !== inputValue.value.replace(/\D/g, '')) {
        inputValue.value = applyMask(newValue?.toString() || '', props.maskType)
    }
}, { immediate: true })
</script>

<template>
    <div class="m-input-mask">
        <input :value="inputValue" @input="updateValue" :maxlength="maxLength" :placeholder="placeholder"
            :class="['m-input-mask__input', { 'invalid': props.invalid }, props.class]" :disabled="disabled"
            v-bind="$attrs" />
    </div>
</template>

<style scoped>
.m-input-mask {
    width: 100%;
}

.m-input-mask__input {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--color-gray-200);
    border: 1px solid var(--color-gray-300);
    color: var(--color-text-primary);
    outline: none;
    transition: all 0.2s ease-in-out;
}

.m-input-mask__input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
}

.m-input-mask__input:disabled {
    background-color: var(--color-bg-tertiary);
    opacity: 0.7;
    cursor: not-allowed;
}

.m-input-mask__input.invalid {
    border-color: #f87171;
}

.m-input-mask__input.invalid:focus {
    box-shadow: 0 0 0 1px #f87171;
}
</style>
