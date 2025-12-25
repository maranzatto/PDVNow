<script setup lang="ts">
import { computed } from 'vue'
import Calendar from 'primevue/calendar'

type DateValue = Date | Date[] | null | undefined

defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    class: {
        type: [String, Object, Array],
        default: ''
    },
    modelValue: {
        type: [Date, String, Array] as unknown as () => DateValue,
        default: null
    },
    showIcon: {
        type: Boolean,
        default: true
    },
    dateFormat: {
        type: String,
        default: 'dd/mm/yy'
    },
    showTime: {
        type: Boolean,
        default: false
    },
    timeOnly: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: 'Selecione uma data'
    }
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: Date | Date[] | null): void
}>()

const model = computed({
    get: () => props.modelValue,
    set: (value: Date | Date[] | null) => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <div class="m-calendar-wrapper">
        <Calendar v-bind="$attrs" v-model="model" :show-icon="showIcon" :date-format="dateFormat" :show-time="showTime"
            :time-only="timeOnly" :placeholder="placeholder" :class="['m-calendar', props.class]" />
    </div>
</template>

<style>
.m-calendar-wrapper {
    width: 100%;
}

.m-calendar .p-calendar {
    width: 100%;
}

.m-calendar .p-inputtext {
    width: 100%;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    background-color: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
}

.m-calendar .p-inputtext:enabled:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-calendar .p-inputtext:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

.m-calendar .p-calendar .p-button {
    background: transparent !important;
    border: none !important;
    color: var(--color-text-secondary) !important;
}

.m-calendar .p-datepicker {
    background: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

.m-calendar .p-datepicker-header {
    background: var(--color-bg-secondary) !important;
    border-bottom: 1px solid var(--color-gray-700) !important;
    color: var(--color-text-primary) !important;
}

.m-calendar .p-datepicker-calendar th {
    color: var(--color-text-secondary) !important;
}

.m-calendar .p-datepicker-calendar td>span {
    color: var(--color-text-primary) !important;
}

.m-calendar .p-datepicker-calendar td>span.p-highlight {
    background: var(--color-primary) !important;
    color: white !important;
}

.m-calendar .p-datepicker-calendar td>span:not(.p-disabled):not(.p-highlight):hover {
    background: var(--color-bg-tertiary) !important;
}

.m-calendar .p-datepicker-today>span {
    border-color: var(--color-primary) !important;
}

.m-calendar .p-datepicker:not(.p-disabled) .p-monthpicker .p-monthpicker-month:not(.p-disabled):hover,
.m-calendar .p-datepicker:not(.p-disabled) .p-yearpicker .p-yearpicker-year:not(.p-disabled):hover {
    background: var(--color-bg-tertiary) !important;
}

.m-calendar .p-datepicker:not(.p-disabled) .p-monthpicker .p-monthpicker-month.p-highlight,
.m-calendar .p-datepicker:not(.p-disabled) .p-yearpicker .p-yearpicker-year.p-highlight {
    background: var(--color-primary) !important;
    color: white !important;
}

.m-calendar .p-datepicker-timepicker button {
    color: var(--color-text-secondary) !important;
}

.m-calendar .p-datepicker-timepicker button:hover {
    color: var(--color-primary) !important;
}

.m-calendar .p-calendar.p-invalid>.p-inputtext {
    border-color: #f87171 !important;
}

.m-calendar .p-calendar.p-invalid>.p-inputtext:enabled:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
