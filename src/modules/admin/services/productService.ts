// services/product.service.ts
import api from "@/services/api";
import type { Product } from "../types/Product";

export const productService = {
    async list() {
        const { data } = await api.get<Product[]>("/admin/products");
        return data;
    },
};
