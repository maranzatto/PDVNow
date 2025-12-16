<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()

const isEditing = ref(false)
const productId = ref<number | null>(null)

const form = ref({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'available' as 'available' | 'out_of_stock' | 'discontinued'
})

const errors = ref({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: ''
})

const categories = [
    'Eletrônicos',
    'Informática',
    'Periféricos',
    'Armazenamento',
    'Áudio',
    'Vídeo',
    'Rede',
    'Acessórios',
    'Mobiliário',
    'Cabos'
]

const statusOptions = [
    { label: 'Disponível', value: 'available' },
    { label: 'Sem Estoque', value: 'out_of_stock' },
    { label: 'Descontinuado', value: 'discontinued' }
]

onMounted(() => {
    const id = route.params.id
    if (id) {
        isEditing.value = true
        productId.value = Number(id)
        loadProduct(productId.value)
    }
})

const loadProduct = (id: number) => {
    // Simular carregamento de produto
    // Em produção, buscar do backend
    const mockProduct = {
        id: id,
        name: 'Notebook Dell Inspiron 15',
        category: 'Informática',
        price: 3500.00,
        stock: 10,
        status: 'available' as const
    }

    form.value = {
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price,
        stock: mockProduct.stock,
        status: mockProduct.status
    }
}

const validateForm = () => {
    errors.value = {
        name: '',
        category: '',
        price: '',
        stock: '',
        status: ''
    }

    let isValid = true

    if (!form.value.name.trim()) {
        errors.value.name = 'Nome é obrigatório'
        isValid = false
    }

    if (!form.value.category) {
        errors.value.category = 'Categoria é obrigatória'
        isValid = false
    }

    if (form.value.price <= 0) {
        errors.value.price = 'Preço deve ser maior que zero'
        isValid = false
    }

    if (form.value.stock < 0) {
        errors.value.stock = 'Estoque não pode ser negativo'
        isValid = false
    }

    if (!form.value.status) {
        errors.value.status = 'Status é obrigatório'
        isValid = false
    }

    return isValid
}

const handleSubmit = () => {
    if (!validateForm()) {
        return
    }

    if (isEditing.value) {
        console.log('Atualizando produto:', productId.value, form.value)
        // Aqui você faria a chamada API para atualizar
    } else {
        console.log('Criando novo produto:', form.value)
        // Aqui você faria a chamada API para criar
    }

    // Simular sucesso e voltar
    router.push({ name: 'AdminProducts' })
}

const goBack = () => {
    router.push({ name: 'AdminProducts' })
}
</script>

<template>
    <div class="product-form-page">
        <div class="page-header">
            <div class="header-left">
                <button class="btn-back" @click="goBack">
                    <i class="pi pi-arrow-left"></i>
                </button>
                <div>
                    <h1 class="page-title">{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</h1>
                    <p class="page-description">
                        {{ isEditing ? 'Atualize as informações do produto' : "Cadastre um novo produto no sistema" }}
                    </p>
                </div>
            </div>
        </div>

        <div class="form-container">
            <form @submit.prevent="handleSubmit">
                <div class="form-grid">
                    <!-- Nome -->
                    <div class="form-field">
                        <label for="name" class="form-label">Nome do Produto *</label>
                        <InputText id="name" v-model="form.name" placeholder="Digite o nome do produto"
                            :invalid="!!errors.name" />
                        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
                    </div>

                    <!-- Categoria -->
                    <div class="form-field">
                        <label for="category" class="form-label">Categoria *</label>
                        <Select id="category" v-model="form.category" :options="categories"
                            placeholder="Selecione uma categoria" :invalid="!!errors.category" />
                        <small v-if="errors.category" class="error-message">{{ errors.category }}</small>
                    </div>

                    <!-- Preço -->
                    <div class="form-field">
                        <label for="price" class="form-label">Preço *</label>
                        <InputNumber id="price" v-model="form.price" mode="currency" currency="BRL" locale="pt-BR"
                            placeholder="0,00" :invalid="!!errors.price" />
                        <small v-if="errors.price" class="error-message">{{ errors.price }}</small>
                    </div>

                    <!-- Estoque -->
                    <div class="form-field">
                        <label for="stock" class="form-label">Estoque *</label>
                        <InputNumber id="stock" v-model="form.stock" placeholder="0" :min="0"
                            :invalid="!!errors.stock" />
                        <small v-if="errors.stock" class="error-message">{{ errors.stock }}</small>
                    </div>

                    <!-- Status -->
                    <div class="form-field full-width">
                        <label for="status" class="form-label">Status *</label>
                        <Select id="status" v-model="form.status" :options="statusOptions" optionLabel="label"
                            optionValue="value" placeholder="Selecione o status" :invalid="!!errors.status" />
                        <small v-if="errors.status" class="error-message">{{ errors.status }}</small>
                    </div>
                </div>

                <div class="form-actions">
                    <Button label="Cancelar" severity="secondary" @click="goBack" type="button" />
                    <Button :label="isEditing ? 'Atualizar' : 'Cadastrar'" type="submit" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.product-form-page {
    padding: 1.5rem;
    background-color: var(--color-bg-secondary);
    min-height: 100vh;
}

.page-header {
    margin-bottom: 2rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn-back {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-gray-700);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.2s;
}

.btn-back:hover {
    background-color: var(--color-gray-800);
    border-color: var(--color-primary);
}

.page-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
}

.page-description {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}

.form-container {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-gray-700);
    border-radius: 0.5rem;
    padding: 2rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-field.full-width {
    grid-column: 1 / -1;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
}

.error-message {
    color: var(--color-error);
    font-size: 0.75rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-gray-700);
}

@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
