// composables/useProductValidation.ts
import type { Ref } from "vue";
import type { CustomerForm, CustomerErrors } from "@/modules/admin/types/customerDetails/customerType";

export const useCustomerValidation = (form: Ref<CustomerForm>, errors: Ref<CustomerErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        if (!form.value.name) {
            errors.value.name = "Nome é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
