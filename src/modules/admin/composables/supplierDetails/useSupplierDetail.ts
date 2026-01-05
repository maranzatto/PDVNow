import { ref } from "vue";
import type { SupplierForm, SupplierErrors } from "@/modules/admin/types/supplierDetails/supplierType";
import { getSupplierById, addNewSupplier, updateSupplier } from "@/modules/admin/services/supplierService";

export function useSupplierDetail() {
    const loading = ref(false);
    const isEditing = ref(false);

    const form = ref<SupplierForm>({
        id: undefined,
        name: "",
        tradeName: "",
        cnpj: "",
        stateRegistration: "",
        email: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        postalCode: "",
        isActive: true,
    });

    const errors = ref<SupplierErrors>({});

    const loadSupplierById = async (id: string) => {
        loading.value = true;
        try {
            const supplier = await getSupplierById(id);
            if (supplier) {
                loadSupplier(supplier);
                isEditing.value = true;
            }
            return supplier;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Popula o formulário com dados parciais ou completos
     */
    const loadSupplier = (supplierData: Partial<SupplierForm>) => {
        form.value = { ...form.value, ...supplierData };
    };

    /**
     * Salva o fornecedor (cria novo ou atualiza existente)
     */
    const saveSupplier = async () => {
        loading.value = true;
        try {
            if (isEditing.value && form.value.id) {
                await updateSupplier(form.value.id, form.value);
            } else {
                await addNewSupplier(form.value);
            }
            return true;
        } catch (error) {
            console.error("Erro ao salvar Fornecedor:", error);
            return false;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Reseta o formulário para o estado inicial
     */
    const resetForm = () => {
        form.value = {
            id: undefined,
            name: "",
            tradeName: "",
            cnpj: "",
            stateRegistration: "",
            email: "",
            phone: "",
            addressLine1: "",
            city: "",
            state: "",
            postalCode: "",
            isActive: true,
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

        // Métodos
        loadSupplierById,
        loadSupplier,
        saveSupplier,
        resetForm,
    };
}
