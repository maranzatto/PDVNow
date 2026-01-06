<script setup lang="ts">
import { computed } from 'vue'
import Calendar from 'primevue/datepicker';

type DateValue = Date | Date[] | string | null | undefined

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
    get: () => {
        if (typeof props.modelValue === 'string') {
            return props.modelValue ? new Date(props.modelValue) : null
        }
        return props.modelValue
    },
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
/* Root element */
.m-calendar .p-datepicker {
    width: 100%;
}

/* Input element */
.m-calendar .p-datepicker-input {
    width: 100%;
    padding: 0.5rem 1rem !important;
    background-color: var(--color-gray-200) !important;
    border: 1px solid var(--color-gray-300) !important;
    color: var(--color-text-primary) !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
}

.m-calendar .p-datepicker-input:enabled:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 1px var(--color-primary) !important;
}

.m-calendar .p-datepicker-input:disabled {
    background-color: var(--color-bg-tertiary) !important;
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

/* Dropdown button */
.m-calendar .p-datepicker-dropdown {
    background-color: var(--color-gray-300) !important;
    color: var(--color-text-primary) !important;
    border: 1px solid var(--color-gray-300) !important;
    border-radius: 0 6px 6px 0 !important;
}

.m-calendar .p-datepicker-dropdown:hover {
    background-color: var(--color-primary) !important;
    color: white !important;
}

/* Panel */
.m-calendar .p-datepicker-panel {
    background-color: var(--color-bg-secondary) !important;
    border: 1px solid var(--color-gray-700) !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

/* Header */
.m-calendar .p-datepicker-header {
    background: var(--color-primary) !important;
    border-bottom: 1px solid var(--color-gray-700) !important;
    color: white !important;
}

.m-calendar .p-datepicker-prev-button,
.m-calendar .p-datepicker-next-button {
    color: white !important;
}

.m-calendar .p-datepicker-title {
    color: white !important;
}

/* Calendar */
.m-calendar .p-datepicker-calendar .p-datepicker-weekday {
    color: var(--color-text-secondary) !important;
}

.m-calendar .p-datepicker-day {
    color: var(--color-text-primary) !important;
}

.m-calendar .p-datepicker-day:not(.p-disabled):not(.p-datepicker-day-selected):hover {
    background: var(--color-bg-tertiary) !important;
}

.m-calendar .p-datepicker-day.p-datepicker-day-selected {
    background: var(--color-primary) !important;
    color: white !important;
}

.m-calendar .p-datepicker-day.p-datepicker-today>span {
    border-color: var(--color-primary) !important;
}

/* Month and Year View */
.m-calendar .p-datepicker-month:not(.p-disabled):hover,
.m-calendar .p-datepicker-year:not(.p-disabled):hover {
    background: var(--color-bg-tertiary) !important;
}

.m-calendar .p-datepicker-month.p-datepicker-month-selected,
.m-calendar .p-datepicker-year.p-datepicker-year-selected {
    background: var(--color-primary) !important;
    color: white !important;
}

/* Time Picker */
.m-calendar .p-datepicker-time-picker .p-datepicker-increment-button,
.m-calendar .p-datepicker-time-picker .p-datepicker-decrement-button {
    color: var(--color-text-secondary) !important;
}

.m-calendar .p-datepicker-time-picker .p-datepicker-increment-button:hover,
.m-calendar .p-datepicker-time-picker .p-datepicker-decrement-button:hover {
    color: var(--color-primary) !important;
}

/* Button bar */
.m-calendar .p-datepicker-buttonbar .p-datepicker-today-button,
.m-calendar .p-datepicker-buttonbar .p-datepicker-clear-button {
    color: var(--color-primary) !important;
}

/* Invalid state */
.m-calendar .p-datepicker.p-invalid .p-datepicker-input {
    border-color: #f87171 !important;
}

.m-calendar .p-datepicker.p-invalid .p-datepicker-input:enabled:focus {
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
