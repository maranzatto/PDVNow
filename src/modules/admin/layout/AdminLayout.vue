<script setup lang="ts">
import IconUser from '@/assets/Icons/IconUser.vue';
import SideComponent from '../components/SideComponent/SideComponent.vue';

</script>

<template>
    <div class="admin-layout">
        <SideComponent />
        <div class="content-area">
            <header class="header">
                <h1>Admin</h1>
                <IconUser :width="32" :height="32" />
            </header>

            <main class="main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

.admin-layout {
    @apply flex w-screen gap-3 h-screen overflow-hidden p-4;
    background-color: var(--color-secondary);
}

.content-area {
    @apply flex-1 flex flex-col overflow-hidden rounded-lg;
}

.header {
    @apply h-15 flex items-center justify-between px-5 bg-gray-900 shrink-0;
}

.main {
    @apply flex-1 overflow-y-auto;
}
</style>
