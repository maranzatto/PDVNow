// composables/useProducts.ts
import { ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import type { Users } from "../types/Users";

export function useUsers() {
    // Dados
    const users = ref<Users[]>(generateUsers(100));

    // Colunas
    const columns: ColumnDef<Users>[] = [
        { accessorKey: "id", header: "Código", size: 80 },
        { accessorKey: "name", header: "Nome", size: 250 },
        { accessorKey: "position", header: "Cargo", size: 150 },
        { id: "actions", header: "Ações", enableSorting: false, size: 100 },
    ];

    // Actions
    const handleNew = () => {
        console.log("Criar novo produto");
        // Implementar lógica
    };

    const handleExport = () => {
        console.log("Exportar produtos");
        // Implementar lógica
    };

    const handleView = (id: number) => {
        console.log("Visualizar usuario:", id);
    };

    const handleEdit = (id: number) => {
        console.log("Editar usuario:", id);
    };

    const handleDelete = (id: number) => {
        console.log("Excluir usuario:", id);
    };

    return {
        users,
        columns,
        handleNew,
        handleExport,
        handleView,
        handleEdit,
        handleDelete,
    };
}

// Função auxiliar para gerar dados
function generateUsers(count: number): Users[] {
    const userNames = [
        "João Silva",
        "Maria Oliveira",
        "Carlos Santos",
        "Ana Costa",
        "Pedro Almeida",
        "Fernanda Lima",
        "Roberto Souza",
        "Camila Mendes",
        "Lucas Ferreira",
        "Juliana Ribeiro",
    ];

    const positions = [
        "Gerente de Vendas",
        "Analista de Marketing",
        "Desenvolvedor Full Stack",
        "Designer UI/UX",
        "Analista de Dados",
        "Coordenador de TI",
        "Supervisor de Operações",
        "Especialista em Segurança da Informação",
        "Consultor de Sistemas",
        "Desenvolvedor Frontend",
    ];

    return Array.from({ length: count }, (_, i) => {
        const nameIndex = Math.floor(Math.random() * userNames.length);
        const positionIndex = Math.floor(Math.random() * positions.length);

        return {
            id: i + 1,
            name: `${userNames[nameIndex]!}`,
            position: positions[positionIndex]!,
        };
    });
}
