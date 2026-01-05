import { ref, computed } from "vue";
import type { ProductForm, ProductErrors } from "@/modules/admin/types/productDetails/productType";
import { getProductById, addNewProduct, updateProduct } from "@/modules/admin/services/productService";

export function useProductDetail() {
    const loading = ref(false);
    const isEditing = ref(false);

    const form = ref<ProductForm>({
        id: undefined,
        name: "",
        description: "",
        sku: "",
        barcode: "",
        unit: "un",
        costPrice: 0,
        salePrice: 0,
        stockQuantity: 0,
        minStockQuantity: 0,
        isActive: true,
        supplierId: null,
    });

    const errors = ref<ProductErrors>({});

    // ============================================
    // Computed
    // ============================================
    const profitMarginPercent = computed(() => {
        const cost = form.value.costPrice ?? 0;
        const sale = form.value.salePrice ?? 0;

        if (cost <= 0 || sale <= 0) return 0;

        return Number((((sale - cost) / cost) * 100).toFixed(2));
    });

    // ============================================
    // Métodos de Carregamento
    // ============================================

    /**
     * Carrega produto por ID do backend e atualiza o formulário
     */
    const loadProductById = async (id: string) => {
        loading.value = true;
        try {
            const product = await getProductById(id);
            if (product) {
                loadProduct(product);
                isEditing.value = true;
            }
            return product;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Popula o formulário com dados parciais ou completos
     */
    const loadProduct = (productData: Partial<ProductForm>) => {
        form.value = { ...form.value, ...productData };
    };

    // ============================================
    // Métodos de Persistência
    // ============================================

    /**
     * Salva o produto (cria novo ou atualiza existente)
     */
    const saveProduct = async () => {
        loading.value = true;
        try {
            if (isEditing.value && form.value.id) {
                await updateProduct(form.value.id, form.value);
            } else {
                await addNewProduct(form.value);
            }
            return true;
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            return false;
        } finally {
            loading.value = false;
        }
    };

    // ============================================
    // Métodos Utilitários
    // ============================================

    /**
     * Reseta o formulário para o estado inicial
     */
    const resetForm = () => {
        form.value = {
            id: undefined,
            name: "",
            description: "",
            sku: "",
            barcode: "",
            unit: "un",
            costPrice: 0,
            salePrice: 0,
            stockQuantity: 0,
            minStockQuantity: 0,
            isActive: true,
            supplierId: null,
        };
        errors.value = {};
        isEditing.value = false;
    };

    // ============================================
    // API Pública
    // ============================================
    return {
        // Estado
        form,
        errors,
        loading,
        isEditing,

        // Computed
        profitMarginPercent,

        // Métodos
        loadProductById,
        loadProduct,
        saveProduct,
        resetForm,
    };
}
