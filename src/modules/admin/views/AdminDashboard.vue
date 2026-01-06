<script setup lang="ts">
// Mock data for the dashboard
const stats = {
    totalSales: 'R$ 12.345,67',
    totalOrders: '1.234',
    totalProducts: '567',
    activeUsers: '89'
};
</script>

<template>
    <div class="dashboard-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">{{ stats.totalSales }}</div>
                <div class="stat-label">Vendas Totais</div>
                <div class="stat-icon">💰</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ stats.totalOrders }}</div>
                <div class="stat-label">Pedidos</div>
                <div class="stat-icon">📋</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ stats.totalProducts }}</div>
                <div class="stat-label">Produtos</div>
                <div class="stat-icon">📦</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ stats.activeUsers }}</div>
                <div class="stat-label">Usuários Ativos</div>
                <div class="stat-icon">👥</div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="content-grid">
            <div class="large-card">
                <h3>Visão Geral</h3>
                <div class="chart-placeholder">
                    <p>Gráfico de Vendas</p>
                </div>
            </div>
            <div class="small-cards">
                <div class="small-card">
                    <h4>Pedidos Recentes</h4>
                    <div class="recent-orders">
                        <p>Pedido #1234 - R$ 125,90</p>
                        <p>Pedido #1233 - R$ 89,50</p>
                        <p>Pedido #1232 - R$ 215,75</p>
                    </div>
                </div>

            </div>
            <div class="full-width-card">
                <h3>Atividades Recentes</h3>
                <div class="activity-list">
                    <p>Usuário atualizou o produto XYZ</p>
                    <p>Novo pedido #1234 recebido</p>
                    <p>Atualização de estoque concluída</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

/* Stats Grid */
.stats-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6;
}

.stat-card {
    @apply rounded-lg p-6 shadow-lg relative overflow-hidden;
    background-color: var(--color-bg-primary);
}

.stat-value {
    @apply text-2xl font-bold mb-1 text-white;
}

.stat-label {
    @apply text-gray-400 text-sm;
}

.stat-icon {
    @apply absolute top-4 right-4 text-3xl opacity-10;
}

/* Content Grid */
.content-grid {
    @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
}

.large-card {
    @apply rounded-lg p-6 shadow-lg lg:col-span-2;
    background-color: var(--color-bg-primary);

}

.small-cards {
    @apply space-y-6;
}

.small-card {
    @apply rounded-lg p-6 shadow-lg h-full;
    background-color: var(--color-bg-primary);

}

.full-width-card {
    @apply rounded-lg p-6 shadow-lg lg:col-span-3;
    background-color: var(--color-bg-primary);

}

/* Placeholders */
.chart-placeholder,
.recent-orders,
.low-stock,
.activity-list {
    @apply bg-gray-700 p-4 rounded mt-4 flex items-center justify-center text-gray-300;
    background-color: var(--color-bg-primary);
}

/* Responsive */
@media (max-width: 768px) {
    .content-grid {
        @apply grid-cols-1;
    }

    .large-card,
    .full-width-card {
        @apply col-span-1;
    }
}
</style>
