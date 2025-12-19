<script setup lang="ts">
import IconDashboard from '@/assets/Icons/IconDashboard.vue';
import IconGroup from '@/assets/Icons/IconGroup.vue';
import IconProducts from '@/assets/Icons/IconProducts.vue';
import IconSuppliers from '@/assets/Icons/IconSuppliers.vue';

</script>

<template>
    <aside class="sidebar">
        <nav class="nav-links">
            <router-link to="/admin/dashboard">
                <IconDashboard />
                Dashboard
            </router-link>

            <router-link to="/admin/users" class="icon-link">
                <IconGroup />
                Usuários
            </router-link>

            <router-link to="/admin/products">
                <IconProducts />
                Produtos
            </router-link>

            <router-link to="/admin/suppliers">
                <IconSuppliers />
                Fornecedores
            </router-link>
        </nav>
    </aside>
</template>

<style>
@import "tailwindcss";

.sidebar {
    @apply w-60 p-5 shrink-0 overflow-hidden rounded-lg shadow-lg;

    background-color: var(--color-bg-primary);
    border-right: 1px solid var(--color-border);
}

.nav-links {
    @apply flex flex-col gap-3;
}

.nav-links a {
    /* Cor do texto vinda do base.css */
    @apply no-underline flex items-center gap-2 px-3 py-2 rounded transition;
    color: var(--color-text-primary);
}

.nav-links a:hover {
    background-color: var(--color-gray-100);
    color: var(--color-primary);
}

/* Estilo para o link ativo (caso use o router-link-active) */
.nav-links a.router-link-active {
    background-color: var(--color-primary);
    color: var(--color-white);
}
</style>
