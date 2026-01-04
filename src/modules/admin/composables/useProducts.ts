import { ref, onMounted } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import router from "@/router";

import type { ProductResponse } from "@/api/generated";
import { fetchProducts, deleteProduct } from "@/modules/admin/services/productService";

export function useProducts() {
    const products = ref<ProductResponse[]>([]);
    const loading = ref(false);

    // Configuração das colunas do grid
    const columns: ColumnDef<ProductResponse>[] = [
        { accessorKey: "id", header: "Código", size: 120 },
        { accessorKey: "name", header: "Produto", size: 180 },
        { accessorKey: "sku", header: "SKU", size: 180 },
        { accessorKey: "salePrice", header: "Preço", size: 120 },
        { accessorKey: "stockQuantity", header: "Estoque", size: 120 },
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
    const loadProducts = async () => {
        loading.value = true;
        try {
            products.value = await fetchProducts({
                skip: 0,
                take: 50,
            });
        } finally {
            loading.value = false;
        }
    };

    // Navegar para criar novo produto
    const handleNew = () => {
        router.push({ name: "AdminProductNew" });
    };

    // Navegar para editar produto
    const handleEdit = (id: string) => {
        router.push({ name: "AdminProductEdit", params: { id } });
    };

    // Deletar produto
    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        await loadProducts();
    };

    // Helpers de formatação
    const formatPrice = (price?: number) => {
        if (price == null) return "-";
        return `R$ ${price.toFixed(2).replace(".", ",")}`;
    };

    const getStockClass = (stock?: number) => {
        if (!stock || stock === 0) return "text-error";
        if (stock < 10) return "text-warning";
        return "text-success";
    };

    // Auto-carregar ao montar
    onMounted(loadProducts);

    return {
        products,
        columns,
        loading,
        loadProducts,
        handleNew,
        handleEdit,
        handleDelete,
        formatPrice,
        getStockClass,
    };
}
