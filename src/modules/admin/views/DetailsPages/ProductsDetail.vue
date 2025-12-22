<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

// PrimeVue Components
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'

// Composables
import { useProductForm } from '@/modules/admin/composables/productDetails/useProductForm'
import { useProductValidation } from '@/modules/admin/composables/productDetails/useProductValidation'
import { useProductOptions } from '@/modules/admin/composables/productDetails/useProductOptions'

const router = useRouter()

interface Props {
    id?: number
}

const props = defineProps<Props>()

const isEditing = ref(false)
const productId = ref<number | null>(null)

// Composables
const { form, errors, loadProduct } = useProductForm()
const { validateForm } = useProductValidation(form, errors)
const { categories, statusOptions } = useProductOptions()

onMounted(() => {
    if (props.id) {
        isEditing.value = true
        productId.value = props.id

        // Mock data para teste
        const mockProduct = {
            name: 'Notebook Dell Inspiron 15',
            sku: 'NOTE-DELL-15',
            barcode: '7891234567890',
            category: 'Informática',
            status: 'active' as const,
            salePrice: 3500,
            costPrice: 3000,
            profitMargin: 16.67,
            allowDiscount: true,
            minPrice: 3200,
            saleUnit: 'un',
            stockControl: true,
            stock: 10,
            minStock: 2,
            maxStock: 50,
            location: 'A1-P2',
            lastMovement: new Date(),
            ncm: '84713012',
            cfop: '5102',
            cst: '102',
            origin: '0',
            icmsRate: 18,
            pisRate: 1.65,
            cofinsRate: 7.6,
            taxSituation: 'tributado',
            hasTaxSubstitution: false,
            supplier: 'Dell Computadores',
            supplierCode: 'DELL-INS15-I5',
            purchaseCost: 2950,
            replenishmentTime: 7,
            lastPurchaseDate: new Date('2024-11-15'),
            lastPurchaseValue: 2950,
            weight: 1.8,
            height: 2.5,
            width: 35.8,
            depth: 24.9,
            brand: 'Dell',
            model: 'Inspiron 15 3000',
            batch: '',
            expirationDate: null,
            serial: '',
            fractional: false,
            saleByWeight: false,
            promotional: false,
            promotionalPrice: 0,
            promotionStart: null,
            promotionEnd: null,
            isKit: false,
            allowSaleWithoutStock: false,
            erpCode: 'ERP-2024-001',
            accountingCode: '1.01.01.001',
            syncEcommerce: true,
            image: '',
            notes: 'Produto com garantia de 12 meses'
        }

        loadProduct(mockProduct)
    }
})

const handleSubmit = () => {
    if (!validateForm()) {
        alert('Por favor, preencha todos os campos obrigatórios')
        return
    }

    if (isEditing.value) {
        console.log('Atualizando produto:', productId.value, form.value)
    } else {
        console.log('Criando produto:', form.value)
    }

    router.push({ name: 'AdminProducts' })
}

const goBack = () => {
    router.push({ name: 'AdminProducts' })
}
</script>

<template>

    <div class="page-header">
        <div class="header-left">
            <button class="btn-back" @click="goBack">
                <i class="pi pi-arrow-left"></i>
            </button>
            <div>
                <h1 class="page-title">
                    {{ isEditing ? 'Editar Produto' : 'Novo Produto' }}
                </h1>
                <p class="page-description">
                    {{ isEditing ? 'Atualize as informações do produto' : 'Cadastre um novo produto no sistema' }}
                </p>
            </div>
        </div>
    </div>

    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <!-- SEÇÃO 1: Identificação -->
            <div class="form-section">
                <h2 class="section-title">Identificação</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label class="form-label">Nome do Produto *</label>
                        <InputText v-model="form.name" :invalid="!!errors.name" />
                        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">Código de barras</label>
                        <InputText v-model="form.barcode" />
                    </div>

                    <div class="form-field form-field-3">
                        <label class="form-label">SKU *</label>
                        <InputText v-model="form.sku" :invalid="!!errors.sku" />
                        <span v-if="errors.sku" class="error-message">{{ errors.sku }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Categoria *</label>
                        <Select v-model="form.category" :options="categories" :invalid="!!errors.category" />
                        <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
                    </div>

                    <div class="form-field form-field-6">
                        <label class="form-label">Status *</label>
                        <Select v-model="form.status" :options="statusOptions" optionLabel="label"
                            optionValue="value" />
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 2: Preço & Venda -->
            <div class="form-section">
                <h2 class="section-title">Preço & Venda</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <label>Preço de Venda *</label>
                        <InputNumber v-model="form.salePrice" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Preço de Custo *</label>
                        <InputNumber v-model="form.costPrice" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Margem (%)</label>
                        <InputNumber v-model="form.profitMargin" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Preço Mínimo</label>
                        <InputNumber v-model="form.minPrice" />
                    </div>

                    <div class="form-field form-field-6">
                        <Checkbox v-model="form.allowDiscount" binary /> Permitir desconto
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 3: Estoque -->
            <div class="form-section">
                <h2 class="section-title">Estoque</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <Checkbox v-model="form.stockControl" binary /> Controlar estoque
                    </div>

                    <div class="form-field form-field-3">
                        <label>Estoque Atual</label>
                        <InputNumber v-model="form.stock" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Estoque Mínimo</label>
                        <InputNumber v-model="form.minStock" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Estoque Máximo</label>
                        <InputNumber v-model="form.maxStock" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Localização</label>
                        <InputText v-model="form.location" />
                    </div>

                    <div class="form-field form-field-6">
                        <label>Última Movimentação</label>
                        <Calendar v-model="form.lastMovement" />
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 4: Fiscal -->
            <div class="form-section">
                <h2 class="section-title">Fiscal</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <label>NCM</label>
                        <InputText v-model="form.ncm" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>CFOP</label>
                        <InputText v-model="form.cfop" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>CST</label>
                        <InputText v-model="form.cst" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Origem</label>
                        <InputText v-model="form.origin" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>ICMS %</label>
                        <InputNumber v-model="form.icmsRate" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>PIS %</label>
                        <InputNumber v-model="form.pisRate" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>COFINS %</label>
                        <InputNumber v-model="form.cofinsRate" />
                    </div>

                    <div class="form-field form-field-6">
                        <Checkbox v-model="form.hasTaxSubstitution" binary /> Substituição Tributária
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 5: Fornecedor -->
            <div class="form-section">
                <h2 class="section-title">Fornecedor</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label>Fornecedor</label>
                        <InputText v-model="form.supplier" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Código Fornecedor</label>
                        <InputText v-model="form.supplierCode" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Custo de Compra</label>
                        <InputNumber v-model="form.purchaseCost" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Prazo Reposição (dias)</label>
                        <InputNumber v-model="form.replenishmentTime" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Última Compra</label>
                        <Calendar v-model="form.lastPurchaseDate" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Valor Última Compra</label>
                        <InputNumber v-model="form.lastPurchaseValue" />
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 6: Logística -->
            <div class="form-section">
                <h2 class="section-title">Logística</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <label>Peso</label>
                        <InputNumber v-model="form.weight" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Altura</label>
                        <InputNumber v-model="form.height" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Largura</label>
                        <InputNumber v-model="form.width" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Profundidade</label>
                        <InputNumber v-model="form.depth" />
                    </div>

                    <div class="form-field form-field-6">
                        <label>Marca</label>
                        <InputText v-model="form.brand" />
                    </div>

                    <div class="form-field form-field-6">
                        <label>Modelo</label>
                        <InputText v-model="form.model" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Lote</label>
                        <InputText v-model="form.batch" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Série</label>
                        <InputText v-model="form.serial" />
                    </div>

                    <div class="form-field form-field-6">
                        <label>Validade</label>
                        <Calendar v-model="form.expirationDate" />
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 7: Comercial -->
            <div class="form-section">
                <h2 class="section-title">Comercial</h2>
                <div class="form-grid">
                    <div class="form-field form-field-3">
                        <Checkbox v-model="form.fractional" binary /> Fracionado
                    </div>

                    <div class="form-field form-field-3">
                        <Checkbox v-model="form.saleByWeight" binary /> Venda por peso
                    </div>

                    <div class="form-field form-field-3">
                        <Checkbox v-model="form.isKit" binary /> Kit
                    </div>

                    <div class="form-field form-field-3">
                        <Checkbox v-model="form.allowSaleWithoutStock" binary /> Vender sem estoque
                    </div>

                    <div class="form-field form-field-3">
                        <Checkbox v-model="form.promotional" binary /> Promocional
                    </div>

                    <div class="form-field form-field-3">
                        <label>Preço Promo</label>
                        <InputNumber v-model="form.promotionalPrice" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Início</label>
                        <Calendar v-model="form.promotionStart" />
                    </div>

                    <div class="form-field form-field-3">
                        <label>Fim</label>
                        <Calendar v-model="form.promotionEnd" />
                    </div>
                </div>
            </div>

            <!-- SEÇÃO 8: Integrações -->
            <div class="form-section">
                <h2 class="section-title">Integrações</h2>
                <div class="form-grid">
                    <div class="form-field form-field-6">
                        <label>Código ERP</label>
                        <InputText v-model="form.erpCode" />
                    </div>

                    <div class="form-field form-field-6">
                        <label>Código Contábil</label>
                        <InputText v-model="form.accountingCode" />
                    </div>

                    <div class="form-field form-field-6">
                        <Checkbox v-model="form.syncEcommerce" binary /> Sincronizar e-commerce
                    </div>

                    <div class="form-field form-field-6">
                        <label>Imagem</label>
                        <InputText v-model="form.image" />
                    </div>

                    <div class="form-field form-field-12">
                        <label>Observações</label>
                        <Textarea v-model="form.notes" rows="3" />
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <Button label="Cancelar" severity="secondary" type="button" @click="goBack" />
                <Button :label="isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'" type="submit" />
            </div>
        </form>
    </div>
</template>

<style scoped>
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
    border-radius: 0.75rem;
    overflow: hidden;
}

.form-section {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-gray-700);
}

.form-section:last-of-type {
    border-bottom: none;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-gray-800);
    border-bottom: 1px solid var(--color-gray-700);
    margin-bottom: 1.5rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid var(--color-gray-700);
    background-color: var(--color-bg-primary);
}

/* Form Grid Styles */
.form-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-field-3 {
    grid-column: span 12;
}

.form-field-6 {
    grid-column: span 12;
}

.form-field-12 {
    grid-column: span 12;
}

@media (min-width: 768px) {
    .form-grid {
        grid-template-columns: repeat(12, 1fr);
    }

    .form-field-3 {
        grid-column: span 3;
    }

    .form-field-6 {
        grid-column: span 6;
    }

    .form-field-12 {
        grid-column: span 12;
    }
}

.form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--p-text-color);
}

.error-message {
    color: var(--p-red-500);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}
</style>
