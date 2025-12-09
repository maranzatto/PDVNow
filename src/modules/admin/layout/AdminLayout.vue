<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <nav>
                <ul>
                    <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
                    <li><router-link to="/admin/users">Users</router-link></li>
                </ul>
            </nav>
        </aside>

        <div class="content-area">
            <header class="header">
                <Breadcrumb />
                <h1>Admin</h1>
            </header>

            <main class="main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<style scoped>
.admin-layout {
    @apply flex w-screen gap-3 h-screen overflow-hidden p-4;
    background-color: var(--color-secondary);
}

.sidebar {
    @apply w-60 bg-gray-900 text-white p-5 flex-shrink-0 overflow-hidden rounded-lg;
}

.sidebar a {
    @apply text-white no-underline;
}

.sidebar ul {
    @apply list-none p-0;
}

.content-area {
    @apply flex-1 flex flex-col overflow-hidden rounded-lg;
}

.header {
    @apply h-[60px] flex items-center px-5 bg-gray-900 flex-shrink-0;
}

.main {
    @apply flex-1 overflow-y-auto;
}
</style>
