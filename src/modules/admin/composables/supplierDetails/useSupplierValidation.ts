// composables/useSupplierValidation.ts
import type { Ref } from "vue";
import type { SupplierErrors, SupplierForm } from "../../types/supplierDetails/supplierType";

export const useSupplierValidation = (form: Ref<SupplierForm>, errors: Ref<SupplierErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        // Identificação
        if (!form.value.name.trim()) {
            errors.value.name = "Nome é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
