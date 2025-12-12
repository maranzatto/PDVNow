<script setup lang="ts">
import Button from 'primevue/button';

const props = defineProps<{
    label?: string;
    icon?: string;
    iconPos?: 'left' | 'right' | 'top' | 'bottom';
    severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
}>();

</script>

<template>
    <Button :icon="props.icon" :iconPos="props.iconPos" :label="props.label" :severity="props.severity" />
</template>

<style scoped></style>
