import { ref } from "vue";
import type { UserForm, UserErros } from "@/modules/admin/types/userDetails/userType";
import { getUserById, addNewUser, updateUser } from "@/modules/admin/services/userService";
import { UserType } from "@/api/generated";

export function useUserDetails() {
    const loading = ref(false);
    const isEditing = ref(false);

    const form = ref<UserForm>({
        id: undefined,
        username: "",
        password: "",
        email: "",
        userType: UserType.Admin,
        isActive: true,
    });

    const errors = ref<UserErros>({});

    const loadUserById = async (id: string) => {
        loading.value = true;
        try {
            const user = await getUserById(id);
            if (user) {
                loadUser(user);
                isEditing.value = true;
            }
            return user;
        } finally {
            loading.value = false;
        }
    };

    const loadUser = (userData: Partial<UserForm>) => {
        form.value = { ...form.value, ...userData };
    };

    const saveUser = async () => {
        loading.value = true;
        try {
            if (isEditing.value && form.value.id) {
                await updateUser(form.value.id, form.value);
            } else {
                await addNewUser(form.value);
            }
            return true;
        } catch (error) {
            console.error("Erro ao salvar Fornecedor:", error);
            return false;
        } finally {
            loading.value = false;
        }
    };

    const resetForm = () => {
        form.value = {
            id: undefined,
            username: "",
            password: "",
            email: "",
            userType: UserType.Admin,
            isActive: true,
        };
        errors.value = {};
        isEditing.value = false;
    };

    return {
        // Estado
        form,
        errors,
        loading,
        isEditing,

        // Métodos
        loadUserById,
        loadUser,
        saveUser,
        resetForm,
    };
}
