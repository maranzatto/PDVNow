import { ref } from "vue";
import type { CustomerForm, CustomerErrors } from "@/modules/admin/types/customerDetails/customerType";
import { getCustomersById, addNewCustomer, updateCustomer } from "@/modules/admin/services/customerService";
import { CustomerPersonType, type CreateCustomerRequest } from "@/api/generated";

export function useCustomerDetail() {
    const loading = ref(false);
    const isEditing = ref(false);

    const form = ref<CustomerForm>({
        id: undefined,
        name: "",
        personType: CustomerPersonType.Individual,
        tradeName: "",
        document: "",
        email: "",
        phone: "",
        mobile: "",
        birthDate: null,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        notes: "",
        creditLimit: 0,
        isActive: true,
    });

    const errors = ref<CustomerErrors>({});

    // ============================================
    // Métodos de Carregamento
    // ============================================

    /**
     * Carrega produto por ID do backend e atualiza o formulário
     */
    const loadCustomerById = async (id: string) => {
        loading.value = true;
        try {
            const customer = await getCustomersById(id);
            if (customer) {
                loadCustomer(customer);
                isEditing.value = true;
            }
            return customer;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Popula o formulário com dados parciais ou completos
     */
    const loadCustomer = (customerData: Partial<CustomerForm>) => {
        const data = { ...customerData };

        // Converter birthDate de string para Date se existir
        if (data.birthDate && typeof data.birthDate === 'string') {
            data.birthDate = new Date(data.birthDate);
        }

        form.value = { ...form.value, ...data };
    };

    // ============================================
    // Métodos de Persistência
    // ============================================

    /**
     * Salva o produto (cria novo ou atualiza existente)
     */
    const saveCustomer = async () => {
        loading.value = true;
        try {
            const formData = { ...form.value };

            // Converter birthDate para string ISO se existir
            if (formData.birthDate instanceof Date) {
                formData.birthDate = formData.birthDate.toISOString().split('T')[0];
            }

            if (isEditing.value && form.value.id) {
                await updateCustomer(form.value.id, formData as CreateCustomerRequest);
            } else {
                await addNewCustomer(formData as CreateCustomerRequest);
            }
            return true;
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            return false;
        } finally {
            loading.value = false;
        }
    };

    // ============================================
    // Métodos Utilitários
    // ============================================

    /**
     * Reseta o formulário para o estado inicial
     */
    const resetForm = () => {
        form.value = {
            id: undefined,
            name: "",
            personType: CustomerPersonType.Individual,
            tradeName: "",
            document: "",
            email: "",
            phone: "",
            mobile: "",
            birthDate: null,
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            notes: "",
            creditLimit: 0,
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

        loadCustomerById,
        loadCustomer,
        saveCustomer,
        resetForm,
    };
}
