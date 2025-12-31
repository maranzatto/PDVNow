// composables/useSuppliers.ts
import { ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import type { Supplier } from "../types/Supplier";
import router from "@/router";

export function useSuppliers() {
    // Dados
    const suppliers = ref<Supplier[]>(generateSuppliers(100));

    // Colunas
    const columns: ColumnDef<Supplier>[] = [
        { accessorKey: "id", header: "ID", size: 60 },
        { accessorKey: "name", header: "Razão Social", size: 250 },
        { accessorKey: "cnpj", header: "CNPJ", size: 180 },
        { accessorKey: "contact", header: "Contato", size: 150 },
        { accessorKey: "email", header: "E-mail", size: 200 },
        { accessorKey: "city", header: "Cidade", size: 120 },
        { accessorKey: "state", header: "UF", size: 60 },
        {
            accessorKey: "rating",
            header: "Avaliação",
            size: 100,
            cell: ({ getValue }) => "⭐".repeat(getValue() as number),
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 100,
            cell: ({ getValue }) => {
                const { text } = getStatusBadge(getValue() as string);
                return text;
            },
        },
        { id: "actions", header: "Ações", enableSorting: false, size: 180 },
    ];

    // Helpers
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return { class: "badge-success", text: "Ativo" };
            case "inactive":
                return { class: "badge-inactive", text: "Inativo" };
            default:
                return { class: "", text: status };
        }
    };

    // Actions
    const handleNew = () => {
        console.log("Criar novo fornecedor");
        router.push({ path: "suppliers/new" });
    };
    const handleExport = () => console.log("Exportar fornecedores");
    const handleView = (id: number) => console.log("Visualizar fornecedor:", id);
    const handleEdit = (id: number) => {
        router.push({ path: `suppliers/${id}/edit` });
        console.log("Editar fornecedor:", id);
    };
    const handleDelete = (id: number) => console.log("Excluir fornecedor:", id);

    return {
        suppliers,
        columns,
        getStatusBadge,
        handleNew,
        handleExport,
        handleView,
        handleEdit,
        handleDelete,
    };
}
