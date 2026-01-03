// composables/useProductValidation.ts
import type { Ref } from "vue";
import type { ProductForm, ProductErrors } from "@/modules/admin/types/productDetails/productType";

export const useProductValidation = (form: Ref<ProductForm>, errors: Ref<ProductErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        if (!form.value.name) {
            errors.value.name = "Nome é obrigatório";
            valid = false;
        }

        if (!form.value.barcode) {
            errors.value.barcode = "Código de barras é obrigatório";
            valid = false;
        }

        if (!form.value.sku) {
            errors.value.sku = "SKU é obrigatório";
            valid = false;
        }

        if (!form.value.salePrice) {
            errors.value.salePrice = "Preço de venda é obrigatório";
            valid = false;
        }

        if (!form.value.stockQuantity) {
            errors.value.stockQuantity = "Estoque é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
