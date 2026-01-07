// composables/useProducts.ts
import { onMounted, ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import router from "@/router";

import type { UserResponse } from "@/api/generated";
import { fetchUsers, deleteUser } from "@/modules/admin/services/userService";

export function useUsers() {
    const users = ref<UserResponse[]>([]);
    const loading = ref(false);

    // Colunas
    const columns: ColumnDef<UserResponse>[] = [
        { accessorKey: "id", header: "Código", size: 80 },
        { accessorKey: "username", header: "Usuário", size: 250 },
        { accessorKey: "email", header: "E-mail", size: 150 },
        { accessorKey: "userType", header: "Tipo Usuário", size: 150 },

        { id: "actions", header: "Ações", enableSorting: false, size: 100 },
    ];

    const loadUsers = async () => {
        loading.value = true;
        try {
            users.value = await fetchUsers({
                skip: 0,
                take: 50,
            });
        } finally {
            loading.value = false;
        }
    };

    const handleNew = () => {
        router.push({ name: "AdminUsersNew" });
    };

    const handleEdit = (id: string) => {
        router.push({ name: "AdminUsersEdit", params: { id } });
    };

    const handleDelete = async (id: string) => {
        await deleteUser(id);
        await loadUsers();
    };

    onMounted(loadUsers);

    return {
        users,
        columns,
        loading,
        loadUsers,
        handleNew,
        handleEdit,
        handleDelete,
    };
}
