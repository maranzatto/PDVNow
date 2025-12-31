<script setup lang="ts" generic="TData">
import { ref } from 'vue'
import {
    useVueTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type ColumnDef,
    type SortingState,
} from '@tanstack/vue-table'

interface Props {
    data: TData[]
    columns: ColumnDef<TData>[]
    searchPlaceholder?: string
    emptyMessage?: string
    showPagination?: boolean
    pageSizeOptions?: number[]
    defaultPageSize?: number
    stickyActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    searchPlaceholder: 'Buscar...',
    emptyMessage: 'Nenhum resultado encontrado',
    showPagination: true,
    pageSizeOptions: () => [10, 20, 30, 50, 100],
    defaultPageSize: 10,
    stickyActions: true,
})

const globalFilter = ref('')
const sorting = ref<SortingState>([])

const table = useVueTable({
    get data() {
        return props.data
    },
    get columns() {
        return props.columns
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageSize: props.defaultPageSize,
        },
    },
    state: {
        get sorting() {
            return sorting.value
        },
        get globalFilter() {
            return globalFilter.value
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue
    },
    onGlobalFilterChange: (updaterOrValue) => {
        globalFilter.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(globalFilter.value)
                : updaterOrValue
    },
})

const isLastColumn = (index: number, total: number) => {
    return index === total - 1
}
</script>

<template>
    <div class="datatable-wrapper">
        <!-- Cabeçalho com busca e ações -->
        <div class="datatable-header">
            <div class="search-container">
                <input v-model="globalFilter" type="text" :placeholder="searchPlaceholder" class="search-input" />
            </div>
            <div v-if="$slots.headerActions" class="header-actions">
                <slot name="headerActions" />
            </div>
        </div>

        <!-- Tabela -->
        <div class="table-container">
            <table class="data-table">
                <thead class="table-header">
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <th v-for="(header, index) in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                            :class="[
                                'table-header-cell',
                                { 'sortable': header.column.getCanSort() },
                                { 'sticky-column': stickyActions && isLastColumn(index, headerGroup.headers.length) }
                            ]"
                            @click="header.column.getCanSort() ? header.column.getToggleSortingHandler()?.($event) : null">
                            <div v-if="!header.isPlaceholder" class="header-content">
                                <template v-if="typeof header.column.columnDef.header === 'function'">
                                    {{ header.column.columnDef.header(header.getContext()) }}
                                </template>
                                <template v-else>
                                    {{ header.column.columnDef.header }}
                                </template>
                                <span v-if="header.column.getIsSorted()" class="sort-indicator">
                                    {{ header.column.getIsSorted() === 'asc' ? '↑' : '↓' }}
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-if="table.getRowModel().rows.length === 0" class="empty-row">
                        <td :colspan="columns.length" class="empty-cell">
                            {{ emptyMessage }}
                        </td>
                    </tr>
                    <tr v-for="row in table.getRowModel().rows" :key="row.id" class="table-row">
                        <td v-for="(cell, index) in row.getVisibleCells()" :key="cell.id" :class="[
                            'table-cell',
                            { 'sticky-column': stickyActions && isLastColumn(index, row.getVisibleCells().length) }
                        ]">
                            <template v-if="$slots[cell.column.id]">
                                <slot :name="cell.column.id" :row="cell.row.original" />
                            </template>

                            <template v-else-if="typeof cell.column.columnDef.cell === 'function'">
                                {{ cell.column.columnDef.cell(cell.getContext()) }}
                            </template>

                            <template v-else>
                                {{ cell.getValue() }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginação -->
        <div v-if="showPagination" class="pagination-container">
            <div class="pagination-info-left">
                <span class="results-count">
                    Mostrando {{ table.getRowModel().rows.length }} de {{ table.getFilteredRowModel().rows.length }}
                    resultado(s)
                </span>
            </div>

            <div class="pagination-controls">
                <button @click="table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()" class="pagination-button"
                    title="Primeira página">
                    «
                </button>
                <button @click="table.previousPage()" :disabled="!table.getCanPreviousPage()" class="pagination-button"
                    title="Página anterior">
                    ‹
                </button>
                <span class="pagination-info">
                    Página
                    <strong>{{ table.getState().pagination.pageIndex + 1 }}</strong> de
                    <strong>{{ table.getPageCount() }}</strong>
                </span>
                <button @click="table.nextPage()" :disabled="!table.getCanNextPage()" class="pagination-button"
                    title="Próxima página">
                    ›
                </button>
                <button @click="table.setPageIndex(table.getPageCount() - 1)" :disabled="!table.getCanNextPage()"
                    class="pagination-button" title="Última página">
                    »
                </button>
            </div>

            <div class="page-size-controls">
                <span class="page-size-label">Itens por página:</span>
                <select :value="table.getState().pagination.pageSize"
                    @change="table.setPageSize(Number(($event.target as HTMLSelectElement).value))"
                    class="page-size-select">
                    <option v-for="size in pageSizeOptions" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
.datatable-wrapper {
    width: 100%;
}

.datatable-header {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.search-container {
    flex: 1;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.search-input {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-300);
    color: var(--color-text-primary);
    outline: none;
    transition: all 0.2s ease-in-out;
}

.search-input::placeholder {
    color: var(--color-text-tertiary);
}

.search-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.table-container {
    overflow-x: auto;
    border-radius: 0.5rem;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-gray-300);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: relative;
}

.data-table {
    min-width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}

.table-header {
    background-color: var(--color-primary-100);
}

.table-header-cell {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-secondary);
}

.table-header-cell.sortable {
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
}

.table-header-cell.sortable:hover {
    background-color: var(--color-primary-200);
}

.header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sort-indicator {
    color: var(--color-primary-light);
}

.table-body {
    background-color: var(--color-bg-primary);
}

.table-body tr {
    border-bottom: 1px solid var(--color-gray-300);
}

.table-row {
    transition: background-color 0.15s ease-in-out;
}

.table-row:hover {
    background-color: var(--color-primary-200);
}

.table-cell {
    padding: 1rem 1.5rem;
    white-space: nowrap;
    font-size: 0.875rem;
    color: var(--color-text-primary);
}

/* Coluna fixa (ações) */
.sticky-column {
    position: sticky;
    right: 0;
    background-color: var(--color-primary-100);
    z-index: 10;
}

.table-body .table-row .sticky-column {
    background-color: var(--color-bg-primary);
    border-left: 1px solid var(--color-gray-300);
}

.table-body .table-row:hover .sticky-column {
    background-color: var(--color-primary-200);
}

.empty-row {
    background-color: var(--color-bg-primary);
}

.empty-cell {
    padding: 2rem 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
}

.pagination-container {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pagination-info-left {
    display: flex;
    align-items: center;
}

.results-count {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-button {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-300);
    color: var(--color-text-primary);
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

.pagination-button:hover:not(:disabled) {
    background-color: var(--color-primary-200);
    border-color: var(--color-primary);
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-info {
    font-size: 0.875rem;
    color: var(--color-text-primary);
}

.page-size-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.page-size-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.page-size-select {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-gray-300);
    color: var(--color-text-primary);
    outline: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.page-size-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Estilos globais para conteúdo renderizado via v-html */
:deep(.badge) {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 9999px;
    display: inline-block;
}

:deep(.badge-success) {
    background-color: rgba(16, 185, 129, 0.15);
    color: var(--color-success);
    border: 1px solid var(--color-success);
}

:deep(.badge-warning) {
    background-color: rgba(245, 158, 11, 0.15);
    color: var(--color-warning);
    border: 1px solid var(--color-warning);
}

:deep(.badge-inactive) {
    background-color: rgba(160, 160, 160, 0.15);
    color: var(--color-gray-400);
    border: 1px solid var(--color-gray-400);
}

:deep(.badge-danger),
:deep(.badge-error) {
    background-color: rgba(239, 68, 68, 0.15);
    color: var(--color-error);
    border: 1px solid var(--color-error);
}

:deep(.badge-info) {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--color-info);
    border: 1px solid var(--color-info);
}

/* Text colors */
:deep(.text-success) {
    color: var(--color-success);
    font-weight: 600;
}

:deep(.text-warning) {
    color: var(--color-warning);
    font-weight: 600;
}

:deep(.text-error),
:deep(.text-danger) {
    color: var(--color-error);
    font-weight: 600;
}

:deep(.text-info) {
    color: var(--color-info);
    font-weight: 600;
}

/* Action buttons */
:deep(.action-buttons) {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
}

:deep(.btn-action) {
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
}

:deep(.btn-view) {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--color-info);
}

:deep(.btn-view:hover) {
    background-color: var(--color-info);
    color: var(--color-white);
}

:deep(.btn-edit) {
    background-color: rgba(102, 126, 234, 0.15);
    color: var(--color-primary);
}

:deep(.btn-edit:hover) {
    background-color: var(--color-primary);
    color: var(--color-white);
}

:deep(.btn-delete) {
    background-color: rgba(239, 68, 68, 0.15);
    color: var(--color-error);
}

:deep(.btn-delete:hover) {
    background-color: var(--color-error);
    color: var(--color-white);
}
</style>
