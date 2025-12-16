// composables/useSuppliers.ts
import { ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import type { Supplier } from "../types/Supplier";

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
            // Apenas retorna o texto, a renderização pode usar o badge externamente
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
    const handleNew = () => console.log("Criar novo fornecedor");
    const handleExport = () => console.log("Exportar fornecedores");
    const handleView = (id: number) => console.log("Visualizar fornecedor:", id);
    const handleEdit = (id: number) => console.log("Editar fornecedor:", id);
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

// Função auxiliar para gerar dados
function generateSuppliers(count: number): Supplier[] {
    const companyNames = [
        "Tech Solutions Ltda",
        "Digital Corp Brasil",
        "Smart Systems SA",
        "Innovate Tech",
        "Future Soft",
        "Mega Store Distribuidora",
        "Prime Distribuidora",
        "Global Trade Import",
        "Brasil Import Export",
        "Nacional Comércio",
        "Alpha Tecnologia",
        "Beta Sistemas",
        "Gamma Solutions",
        "Delta Corp",
        "Epsilon Trade",
    ];

    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Brasília", "Salvador", "Fortaleza", "Recife", "Manaus"];

    const states = ["SP", "RJ", "MG", "PR", "RS", "DF", "BA", "CE", "PE", "AM"];
    const statuses: ("active" | "inactive")[] = ["active", "inactive"];

    return Array.from({ length: count }, (_, i) => {
        const stateIndex = Math.floor(Math.random() * states.length);
        const companyIndex = Math.floor(Math.random() * companyNames.length);
        const statusIndex = Math.floor(Math.random() * statuses.length);

        return {
            id: i + 1,
            name: companyNames[companyIndex]!,
            cnpj: `${String(Math.floor(Math.random() * 90000000) + 10000000).padStart(8, "0")}.${String(Math.floor(Math.random() * 9000) + 1000).padStart(
                4,
                "0"
            )}.${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0")}/0001-${String(Math.floor(Math.random() * 90) + 10).padStart(2, "0")}`,
            contact: `(${Math.floor(Math.random() * 90) + 10}) ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`,
            email: `contato${i}@example.com.br`,
            city: cities[stateIndex]!,
            state: states[stateIndex]!,
            rating: Math.floor(Math.random() * 5) + 1,
            status: statuses[statusIndex]!,
        };
    });
}
