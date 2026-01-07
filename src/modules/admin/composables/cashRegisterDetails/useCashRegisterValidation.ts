import type { Ref } from "vue";
import type { CashRegisterForm, CashRegisterErrors } from "../../types/cashRegisterDetails/cashRegisterType";

export const useCashRegisterValidation = (form: Ref<CashRegisterForm>, errors: Ref<CashRegisterErrors>) => {
    const validateForm = (): boolean => {
        errors.value = {};
        let valid = true;

        if (!form.value.cashRegisterName) {
            errors.value.cashRegisterName = "Nome é obrigatório";
            valid = false;
        }

        return valid;
    };

    return {
        validateForm,
    };
};
