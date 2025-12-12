<script setup lang="ts">
import IconDashboard from '@/assets/Icons/IconDashboard.vue';
import IconGroup from '@/assets/Icons/IconGroup.vue';
import IconProducts from '@/assets/Icons/IconProducts.vue';
import IconSuppliers from '@/assets/Icons/IconSuppliers.vue';

</script>

<template>
    <aside class="sidebar">
        <div>
            <div></div>
            <div></div>
        </div>

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
    @apply w-60 bg-gray-900 text-white p-5 shrink-0 overflow-hidden rounded-lg;
}

.nav-links {
    @apply flex flex-col gap-3;
}

.nav-links a {
    @apply text-white no-underline flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 transition;
}
</style>
