// composables/useSuppliers.ts
import { onMounted, ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import router from "@/router";

import type { SupplierResponse } from "@/api/generated";
import { fetchSuppliers, deleteSupplier } from "@/modules/admin/services/supplierService";

export function useSuppliers() {
    const suppliers = ref<SupplierResponse[]>([]);
    const loading = ref(false);

    // Colunas
    const columns: ColumnDef<SupplierResponse>[] = [
        { accessorKey: "id", header: "Código", size: 60 },
        { accessorKey: "name", header: "Razão Social", size: 250 },
        { accessorKey: "tradeName", header: "Nome Fantasia", size: 250 },
        { accessorKey: "cnpj", header: "CNPJ", size: 180 },
        { accessorKey: "contact", header: "Telefone", size: 150 },
        { accessorKey: "phone", header: "Celular", size: 150 },
        { accessorKey: "email", header: "E-mail", size: 200 },
        { accessorKey: "city", header: "Cidade", size: 120 },
        { accessorKey: "state", header: "UF", size: 60 },
        { id: "actions", header: "Ações", enableSorting: false, size: 180 },
    ];

    // Carregar lista de fornecedores
    const loadSuppliers = async () => {
        loading.value = true;
        try {
            suppliers.value = await fetchSuppliers({
                skip: 0,
                take: 50,
            });
        } finally {
            loading.value = false;
        }
    };

    // Navegar para criar novo fornecedor
    const handleNew = () => {
        router.push({ name: "AdminSuppliersNew" });
    };

    // Navegar para editar fornecedor
    const handleEdit = (id: string) => {
        router.push({ name: "AdminSuppliersEdit", params: { id } });
    };

    // Deletar fornecedor
    const handleDelete = async (id: string) => {
        await deleteSupplier(id);
        await loadSuppliers();
    };

    const handleExport = () => console.log("Exportar fornecedores");

    // Auto-carregar ao montar
    onMounted(loadSuppliers);

    return {
        suppliers,
        columns,
        handleNew,
        handleExport,
        handleEdit,
        handleDelete,
    };
}
