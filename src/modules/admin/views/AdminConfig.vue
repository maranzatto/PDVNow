<script setup lang="ts">
import { ref } from 'vue'

// Cores mockadas
const primaryColor = ref('#4361ee')
const primaryDarkColor = ref('#364fc7')
const secondaryColor = ref('#7c3aed')
const textPrimaryColor = ref('#111827')
const textSecondaryColor = ref('#4b5563')

const resetToDefault = () => {
    primaryColor.value = '#4361ee'
    primaryDarkColor.value = '#364fc7'
    secondaryColor.value = '#7c3aed'
    textPrimaryColor.value = '#111827'
    textSecondaryColor.value = '#4b5563'
}
</script>

<template>
    <div class="admin-config">
        <div class="page-header">
            <h1>Configurações do Tema</h1>
            <p>Personalize as cores do seu painel administrativo</p>
        </div>

        <div class="config-section">
            <h2>Cores do Tema</h2>

            <div class="color-picker-group">
                <div class="color-picker">
                    <label for="primary-color">Cor Primária</label>
                    <div class="color-input-container">
                        <input id="primary-color" v-model="primaryColor" type="color" />
                        <span class="color-value">{{ primaryColor }}</span>
                    </div>
                    <div class="color-preview" :style="{ backgroundColor: primaryColor }"></div>
                </div>

                <div class="color-picker">
                    <label for="secondary-color">Cor Secundária</label>
                    <div class="color-input-container">
                        <input id="secondary-color" v-model="secondaryColor" type="color" />
                        <span class="color-value">{{ secondaryColor }}</span>
                    </div>
                    <div class="color-preview" :style="{ backgroundColor: secondaryColor }"></div>
                </div>
            </div>

            <h2>Cores de Texto</h2>

            <div class="color-picker-group">
                <div class="color-picker">
                    <label for="text-primary">Texto Primário</label>
                    <div class="color-input-container">
                        <input id="text-primary" v-model="textPrimaryColor" type="color" />
                        <span class="color-value">{{ textPrimaryColor }}</span>
                    </div>
                    <div class="color-preview" :style="{ backgroundColor: textPrimaryColor }"></div>
                </div>
            </div>

            <div class="actions">
                <button class="btn btn-primary" @click="resetToDefault">
                    Redefinir para Padrão
                </button>
            </div>
        </div>

        <div class="preview-section">
            <h3>Prévia do Tema</h3>
            <div class="preview-container">
                <div class="preview-header" :style="{ backgroundColor: primaryColor }">
                    <div class="preview-logo">Logo</div>
                    <div class="preview-nav">
                        <span class="nav-item active">Início</span>
                        <span class="nav-item">Produtos</span>
                        <span class="nav-item">Vendas</span>
                        <span class="nav-item">Relatórios</span>
                    </div>
                </div>
                <div class="preview-content">
                    <div class="preview-sidebar">
                        <div class="sidebar-item active" :style="{
                            color: primaryColor,
                            borderLeftColor: primaryColor
                        }">
                            <i class="pi pi-home"></i>
                            <span>Dashboard</span>
                        </div>
                        <div class="sidebar-item" :style="{ color: textSecondaryColor }">
                            <i class="pi pi-box"></i>
                            <span>Produtos</span>
                        </div>
                        <div class="sidebar-item" :style="{ color: textSecondaryColor }">
                            <i class="pi pi-shopping-cart"></i>
                            <span>Vendas</span>
                        </div>
                    </div>
                    <div class="preview-main">
                        <div class="card">
                            <h4 :style="{ color: textPrimaryColor }">Bem-vindo ao Painel</h4>
                            <p :style="{ color: textSecondaryColor }">Esta é uma prévia do seu tema personalizado.</p>
                            <button class="btn btn-primary mr-2" :style="{ backgroundColor: primaryColor }">
                                Botão Primário
                            </button>
                            <button class="btn btn-secondary" :style="{ backgroundColor: secondaryColor }">
                                Botão Secundário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-header {
    margin-bottom: .7rem;
}

.page-header h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.page-header p {
    color: var(--color-text-secondary);
    margin: 0;
}

.config-section {
    background: var(--color-white);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
    margin-top: 1.5rem;
}

h2:first-of-type {
    margin-top: 0;
}

h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
}

.color-picker-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.color-picker {
    margin-bottom: 1rem;
}

.color-picker label {
    display: block;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.color-input-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0.5rem 0;
}

input[type="color"] {
    width: 50px;
    height: 30px;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 2px;
}

input[type="color"]::-webkit-color-swatch {
    border-radius: 2px;
    border: none;
}

.color-value {
    font-family: monospace;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.color-preview {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    margin-top: 0.5rem;
    border: 1px solid var(--color-border);
}

.actions {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    color: white;
}

.btn-primary {
    background-color: var(--color-primary);
}

.btn-primary:hover {
    background-color: var(--color-primary-dark);
}

.btn-secondary {
    background-color: var(--color-secondary);
    margin-left: 0.5rem;
}

.preview-section {
    background: var(--color-white);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-container {
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
    background: white;
}

.preview-header {
    color: white;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.preview-logo {
    font-weight: 600;
    font-size: 1.2rem;
}

.preview-nav {
    display: flex;
    gap: 1.5rem;
}

.nav-item {
    cursor: pointer;
    padding: 0.25rem 0;
    position: relative;
}

.nav-item.active {
    font-weight: 500;
}

.nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    right: 0;
    height: 2px;
    background-color: white;
}

.preview-content {
    display: flex;
    min-height: 300px;
}

.preview-sidebar {
    width: 220px;
    background-color: #f8f9fa;
    border-right: 1px solid var(--color-border);
    padding: 1rem 0;
}

.sidebar-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
}

.sidebar-item:hover {
    background-color: #e9ecef;
    color: var(--color-text-primary);
}

.sidebar-item.active {
    background-color: #e9ecef;
    border-left: 3px solid;
    font-weight: 500;
}

.sidebar-item i {
    margin-right: 0.75rem;
    font-size: 1.1rem;
}

.preview-main {
    flex: 1;
    padding: 1.5rem;
    background-color: white;
}

.card {
    background: white;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card h4 {
    margin-top: 0;
    margin-bottom: 1rem;
}

.card p {
    margin-bottom: 1.5rem;
}
</style>
