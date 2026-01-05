// composables/useSupplierValidation.ts
import type { Ref } from "vue";
import type { SupplierErrors, SupplierForm } from "../../types/supplierDetails/supplierType";

export const useSupplierValidation = (form: Ref<SupplierForm>, errors: Ref<SupplierErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        // Identificação
        if (!form.value.name) {
            errors.value.name = "Nome é obrigatório";
            valid = false;
        }

        if (!form.value.cnpj) {
            errors.value.cnpj = "CNPJ é obrigatório";
            valid = false;
        }

        if (!form.value.phone) {
            errors.value.phone = "Telefone é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
