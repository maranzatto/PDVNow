import type { ProductUnit } from "@/api/generated";

// types/product.types.ts
export interface ProductForm {
    // ===== BACK (ProductResponse) =====
    id?: string;
    code?: number;

    name?: string | null | undefined;
    description?: string | null;
    sku?: string | null;
    barcode?: string | null;
    unit?: ProductUnit;

    costPrice?: number;
    salePrice?: number;
    stockQuantity?: number;
    minStockQuantity?: number | null;

    isActive?: boolean;
    supplierId?: string | null;

    createdAtUtc?: string;
    updatedAtUtc?: string | null;
}

export type ProductErrors = Record<string, string>;
