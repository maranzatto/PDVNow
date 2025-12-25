<template>
    <div class="not-found">
        <div class="content">
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>A página que você está procurando não existe ou foi movida.</p>
            <router-link to="/" class="back-home">
                Voltar para a página inicial
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding: 2rem;
    background-color: var(--color-bg-secondary);
}

.content {
    max-width: 500px;
    padding: 2rem;
    background: var(--color-bg-primary);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-lg);
}

h1 {
    font-size: 6rem;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 1rem;
    line-height: 1;
}

h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
}

p {
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
}

.back-home {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: background-color 0.2s ease;
}

.back-home:hover {
    background-color: var(--color-primary-dark);
}
</style>
