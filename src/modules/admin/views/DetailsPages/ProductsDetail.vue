<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

// Composables
import { useProductForm } from '@/modules/admin/composables/productDetails/useProductForm'
import { useProductValidation } from '@/modules/admin/composables/productDetails/useProductValidation'

// Sub-componentes
import ProductFormIdentification from '@/modules/admin/views/DetailsPages/ProductFormIdentification.vue'
import ProductFormPricing from '@/modules/admin/views/DetailsPages/ProductFormPricing.vue'
import ProductFormStock from '@/modules/admin/views/DetailsPages/ProductFormStock.vue'
import ProductFormTax from '@/modules/admin/views/DetailsPages/ProductFormTax.vue'
import ProductFormSupplier from '@/modules/admin/views/DetailsPages/ProductFormSupplier.vue'
import ProductFormLogistics from '@/modules/admin/views/DetailsPages/ProductFormLogistics.vue'
import ProductFormCommercial from '@/modules/admin/views/DetailsPages/ProductFormCommercial.vue'
import ProductFormIntegrations from '@/modules/admin/views/DetailsPages/ProductFormIntegrations.vue'

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
    <div class="product-form-page">
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
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Identificação</Tab>
                        <Tab value="1">Preço & Venda</Tab>
                        <Tab value="2">Estoque</Tab>
                        <Tab value="3">Fiscal</Tab>
                        <Tab value="4">Fornecedor</Tab>
                        <Tab value="5">Logística</Tab>
                        <Tab value="6">Comercial</Tab>
                        <Tab value="7">Integrações</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel value="0">
                            <ProductFormIdentification v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="1">
                            <ProductFormPricing v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="2">
                            <ProductFormStock v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="3">
                            <ProductFormTax v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="4">
                            <ProductFormSupplier v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="5">
                            <ProductFormLogistics v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="6">
                            <ProductFormCommercial v-model:form="form" :errors="errors" />
                        </TabPanel>

                        <TabPanel value="7">
                            <ProductFormIntegrations v-model:form="form" :errors="errors" />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <div class="form-actions">
                    <Button label="Cancelar" severity="secondary" type="button" @click="goBack" />
                    <Button :label="isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'" type="submit" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.product-form-page {
    padding: 1.5rem;
    background-color: var(--color-bg-secondary);
    height: 100%;
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
    border-radius: 0.75rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid var(--color-gray-700);
}
</style>
