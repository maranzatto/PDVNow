<script setup lang="ts">
import IconCashRegister from '@/assets/Icons/IconCashRegister.vue';
import IconDashboard from '@/assets/Icons/IconDashboard.vue';
import IconGroup from '@/assets/Icons/IconGroup.vue';
import IconProducts from '@/assets/Icons/IconProducts.vue';
import IconSuppliers from '@/assets/Icons/IconSuppliers.vue';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/auth';

const authStore = useAuthStore();

function logout() {
    authStore.logout();
    router.push({ name: 'Login' });
}

function enterPDV() {
    const url = router.resolve('/pdv').href;
    window.open(url, '_blank');
}
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

            <router-link to="/admin/cash-register">
                <IconCashRegister />
                Caixas
            </router-link>

            <router-link to="/admin/theme-config">
                <IconSuppliers />
                Tema do sistema
            </router-link>
        </nav>
        <div class="actions">
            <div class="action-buttons">
                <button @click="enterPDV" class="maior btn-action btn-edit">
                    <i class="pi pi-desktop"></i><span>Frente de caixa</span>
                </button>
                <button @click="logout" class="menor btn-action btn-delete">
                    <i class="pi pi-sign-out"></i>
                </button>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
    overflow: hidden;
    width: var(--sidebar-width);
    background-color: var(--color-bg-primary);
    border-radius: 0.75rem;
    box-shadow: var(--shadow);
}

.nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    overflow-y: auto;
    padding-right: 0.25rem;
    margin: 1rem 0;
}

.nav-links a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: var(--color-text-secondary);
    font-weight: 500;
    transition: all 0.2s ease-in-out;
}

.nav-links a:hover {
    background-color: var(--color-hover);
    color: var(--color-primary);
}

.nav-links a.router-link-active {
    background-color: var(--color-active);
    color: var(--color-primary);
    font-weight: 600;
}

.nav-links a svg {
    transition: transform 0.2s ease-in-out;
}

.nav-links a:hover svg {
    transform: scale(1.1);
}

/* Estilização da scrollbar */
.nav-links::-webkit-scrollbar {
    width: 4px;
}

.nav-links::-webkit-scrollbar-thumb {
    background-color: var(--color-scrollbar);
    border-radius: 4px;
}

.nav-links::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-scrollbar-hover);
}

/* Responsividade */
@media (max-width: 768px) {
    .sidebar {
        width: 4rem;
        padding: 0.5rem;
    }

    .nav-links span {
        display: none;
    }

    .nav-links a {
        justify-content: center;
        padding: 0.75rem 0.5rem;
    }
}

/* Action buttons */
.actions {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
}

.btn-action {
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

.maior {
    width: 80%;
}

.menor {
    width: 15%;
}

.btn-view {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--color-info);
}

.btn-view:hover {
    background-color: var(--color-info);
    color: white;
}

.btn-edit {
    background-color: rgba(102, 126, 234, 0.15);
    color: var(--color-primary);
}

.btn-edit:hover {
    background-color: var(--color-primary);
    color: white;
}

.btn-delete {
    background-color: rgba(239, 68, 68, 0.15);
    color: var(--color-error);
}

.btn-delete:hover {
    background-color: var(--color-error);
    color: white;
}
</style>
