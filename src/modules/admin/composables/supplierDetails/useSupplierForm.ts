// composables/useProductForm.ts
import { ref } from "vue";
import type { SupplierErrors, SupplierForm } from "../../types/supplierDetails/supplierType";

export const useSupplierForm = () => {
    const form = ref<SupplierForm>({
        name: "",
        city: "",
        cnpj: "",
        contact: "",
        email: "",
        rating: 0,
        state: "",
        status: "active",
    });

    const errors = ref<SupplierErrors>({});

    const loadSupplier = (supplierData: Partial<SupplierForm>) => {
        form.value = { ...form.value, ...supplierData };
    };

    const resetForm = () => {
        form.value = {
            name: "",
            city: "",
            cnpj: "",
            contact: "",
            email: "",
            rating: 0,
            state: "",
            status: "active",
        };
        errors.value = {};
    };

    return {
        form,
        errors,
        loadSupplier,
        resetForm,
    };
};
