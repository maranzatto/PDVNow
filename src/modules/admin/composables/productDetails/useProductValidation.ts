// composables/useProductValidation.ts
import type { Ref } from "vue";
import type { ProductForm, ProductErrors } from "@/modules/admin/types/productDetails/productType";

export const useProductValidation = (form: Ref<ProductForm>, errors: Ref<ProductErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        // Identificação
        if (!form.value.name.trim()) {
            errors.value.name = "Nome é obrigatório";
            valid = false;
        }

        if (!form.value.sku) {
            errors.value.sku = "SKU é obrigatório";
            valid = false;
        }

        if (!form.value.category) {
            errors.value.category = "Categoria é obrigatória";
            valid = false;
        }

        // Preço e venda
        if (form.value.salePrice <= 0) {
            errors.value.salePrice = "Preço de venda inválido";
            valid = false;
        }

        if (form.value.costPrice <= 0) {
            errors.value.costPrice = "Preço de custo inválido";
            valid = false;
        }

        // Fiscal
        if (!form.value.ncm) {
            errors.value.ncm = "NCM é obrigatório";
            valid = false;
        }

        if (!form.value.cfop) {
            errors.value.cfop = "CFOP é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
