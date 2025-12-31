// composables/useProductForm.ts
import { ref } from "vue";
import type { UserErros, UserForm } from "../../types/userDetails/userType";

export const useUserForm = () => {
    const form = ref<UserForm>({
        name: "",
        position: "",
    });

    const errors = ref<UserErros>({});

    const loadUser = (userData: Partial<UserForm>) => {
        form.value = { ...form.value, ...userData };
    };

    const resetForm = () => {
        form.value = {
            name: "",
            position: "",
        };
        errors.value = {};
    };

    return {
        form,
        errors,
        loadUser,
        resetForm,
    };
};
