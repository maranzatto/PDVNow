// composables/useProducts.ts
import { ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import type { Product } from "../types/Product";

export function useProducts() {
    // Dados
    const products = ref<Product[]>(generateProducts(100));

    // Colunas
    const columns: ColumnDef<Product>[] = [
        { accessorKey: "id", header: "Código", size: 80 },
        { accessorKey: "name", header: "Produto", size: 250 },
        { accessorKey: "category", header: "Categoria", size: 150 },
        {
            accessorKey: "price",
            header: "Preço",
            size: 120,
            cell: ({ getValue }) => {
                const price = getValue() as number;
                return `R$ ${price.toFixed(2).replace(".", ",")}`;
            },
        },
        {
            accessorKey: "stock",
            header: "Estoque",
            size: 100,
            cell: ({ getValue }) => {
                const stock = getValue() as number;
                const className =
                    stock === 0 ? "text-error" : stock < 10 ? "text-warning" : "text-success";
                return `<span class="${className}">${stock}</span>`;
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 120,
            cell: ({ getValue }) => {
                const status = getValue() as string;
                switch (status) {
                    case "available":
                        return '<span class="badge badge-success">Disponível</span>';
                    case "out_of_stock":
                        return '<span class="badge badge-warning">Sem Estoque</span>';
                    case "discontinued":
                        return '<span class="badge badge-inactive">Descontinuado</span>';
                    default:
                        return status;
                }
            },
        },
        {
            id: "actions",
            header: "Ações",
            size: 180,
            enableSorting: false,
            cell: ({ row }) => `
                <div class="action-buttons">
                    <button class="btn-action btn-edit" data-id="${row.original.id}">
                        <i class="pi pi-pencil"></i>
                    </button>
                    <button class="btn-action btn-delete" data-id="${row.original.id}">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>
            `,
        },
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
        console.log("Visualizar produto:", id);
    };

    const handleEdit = (id: number) => {
        console.log("Editar produto:", id);
    };

    const handleDelete = (id: number) => {
        console.log("Excluir produto:", id);
    };

    return {
        products,
        columns,
        handleNew,
        handleExport,
        handleView,
        handleEdit,
        handleDelete,
    };
}

// Função auxiliar para gerar dados
function generateProducts(count: number): Product[] {
    const productNames = [
        "Notebook Dell Inspiron",
        "Mouse Logitech MX Master",
        "Teclado Mecânico Keychron",
        "Monitor LG UltraWide",
        "Webcam Logitech C920",
        "Headset HyperX Cloud",
        "SSD Samsung 1TB",
        "HD Externo Seagate 2TB",
        "Impressora HP LaserJet",
        "Scanner Epson WorkForce",
        "Cadeira Gamer DXRacer",
        "Mesa Digitalizadora Wacom",
        "Microfone Blue Yeti",
        "Roteador TP-Link Archer",
        "Switch Cisco 24 Portas",
        "Cabo HDMI 2.1 Premium",
        "Hub USB-C 7 em 1",
        "Mousepad Gamer XL",
        "Suporte Monitor Articulado",
        "WebCam Ring Light",
    ];

    const categories = [
        "Eletrônicos",
        "Informática",
        "Periféricos",
        "Armazenamento",
        "Áudio",
        "Vídeo",
        "Rede",
        "Acessórios",
        "Mobiliário",
        "Cabos",
    ];

    const statuses: ("available" | "out_of_stock" | "discontinued")[] = [
        "available",
        "out_of_stock",
        "discontinued",
    ];

    return Array.from({ length: count }, (_, i) => {
        const nameIndex = Math.floor(Math.random() * productNames.length);
        const categoryIndex = Math.floor(Math.random() * categories.length);
        const statusIndex = Math.floor(Math.random() * statuses.length);
        const stock = Math.floor(Math.random() * 100);

        return {
            id: i + 1,
            name: `${productNames[nameIndex]!} ${i + 1}`,
            category: categories[categoryIndex]!,
            price: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
            stock: stock,
            status: stock === 0 ? "out_of_stock" : statuses[statusIndex]!,
        };
    });
}
