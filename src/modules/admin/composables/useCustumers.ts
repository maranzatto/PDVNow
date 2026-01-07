import { ref, onMounted } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import router from "@/router";

import type { CustomerResponse } from "@/api/generated";
import { fetchCustomers, deleteCustomer } from "@/modules/admin/services/customerService";

export function useCostumers() {
    const customers = ref<CustomerResponse[]>([]);
    const loading = ref(false);

    // Configuração das colunas do grid
    const columns: ColumnDef<CustomerResponse>[] = [
        { accessorKey: "code", header: "Código", size: 120 },
        { accessorKey: "name", header: "Nome", size: 180 },
        { accessorKey: "tradeName", header: "Nome fantasia", size: 180 },
        { accessorKey: "document", header: "CPF", size: 120 },
        { accessorKey: "email", header: "E-mail", size: 120 },
        {
            accessorKey: "isActive",
            header: "Status",
            size: 120,
            cell: ({ getValue }) => (getValue<boolean>() ? "Ativo" : "Inativo"),
        },
        {
            id: "actions",
            header: "Ações",
            enableSorting: false,
            size: 180,
        },
    ];

    // Carregar lista de produtos
    const loadCustomers = async () => {
        loading.value = true;
        try {
            customers.value = await fetchCustomers({
                skip: 0,
                take: 50,
            });
        } finally {
            loading.value = false;
        }
    };

    // Navegar para criar novo produto
    const handleNew = () => {
        router.push({ name: "AdminCostumersNew" });
    };

    // Navegar para editar produto
    const handleEdit = (id: string) => {
        router.push({ name: "AdminCostumersEdit", params: { id } });
    };

    // Deletar produto
    const handleDelete = async (id: string) => {
        await deleteCustomer(id);
        await loadCustomers();
    };

    // Helpers de formatação
    const formatPrice = (price?: number) => {
        if (price == null) return "-";
        return `R$ ${price.toFixed(2).replace(".", ",")}`;
    };

    // Auto-carregar ao montar
    onMounted(loadCustomers);

    return {
        customers,
        columns,
        loading,
        loadCustomers,
        handleNew,
        handleEdit,
        handleDelete,
        formatPrice,
    };
}
