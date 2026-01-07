<script setup lang="ts">
import DataTable from '@/modules/admin/components/DataTablesComponent/DataTablesComponent.vue'
import { useUsers } from '../composables/useUsers'
import { Button } from 'primevue';

const { users, columns, handleNew, handleEdit, handleDelete } = useUsers()
</script>

<template>
    <div class="page">
        <h1 class="title">Usuários</h1>
        <DataTable :data="users" :columns="columns">
            <template #headerActions>
                <Button @click="handleNew" class="p-button-primary">
                    <i class="pi pi-plus"></i>
                    <span>Novo Usuário</span>
                </Button>
            </template>

            <template #actions="{ row }">
                <div class="action-buttons">
                    <button class="btn-action btn-edit" @click="handleEdit(row.id!)">
                        <i class="pi pi-pencil"></i>
                    </button>
                    <button class="btn-action btn-delete" @click="handleDelete(row.id!)">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped></style>
