// composables/useSupplierValidation.ts
import type { Ref } from "vue";
import type { UserErros, UserForm } from "../../types/userDetails/userType";

export const useUserValidation = (form: Ref<UserForm>, errors: Ref<UserErros>) => {
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
