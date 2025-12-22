<script setup lang="ts">
import IconUser from '@/assets/Icons/IconUser.vue';
import SideComponent from '../components/SideComponent/SideComponent.vue';

</script>

<template>
    <div class="admin-layout">
        <SideComponent />
        <div class="content-area">
            <header class="header">
                <h4 class="mb-0">Admin</h4>
                <IconUser :width="32" :height="32" />
            </header>

            <main class="main">
                <router-view />
            </main>
        </div>
    </div>
</template>

<style scoped>
.admin-layout {
    display: flex;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    gap: 1rem;
    overflow: hidden;
}

.content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    height: var(--header-height);
    background-color: var(--color-bg-primary);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
}

.main {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: var(--color-bg-secondary);
}
</style>
