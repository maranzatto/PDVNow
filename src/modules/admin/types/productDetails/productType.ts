// types/product.types.ts
export interface ProductForm {
    // 1. Identificação
    name: string;
    sku: string;
    barcode: string;
    category: string;
    status: "active" | "inactive" | "available" | "out_of_stock";

    // 2. Preço e venda
    salePrice: number;
    costPrice: number;
    profitMargin: number;
    allowDiscount: boolean;
    minPrice: number;
    saleUnit: string;

    // 3. Estoque
    stockControl: boolean;
    stock: number;
    minStock: number;
    maxStock: number;
    location: string;
    lastMovement: Date | null;

    // 4. Fiscal
    ncm: string;
    cfop: string;
    cst: string;
    origin: string;
    icmsRate: number;
    pisRate: number;
    cofinsRate: number;
    taxSituation: string;
    hasTaxSubstitution: boolean;

    // 5. Fornecedor
    supplier: string;
    supplierCode: string;
    purchaseCost: number;
    replenishmentTime: number;
    lastPurchaseDate: Date | null;
    lastPurchaseValue: number;

    // 6. Logística
    weight: number;
    height: number;
    width: number;
    depth: number;
    brand: string;
    model: string;
    batch: string;
    expirationDate: Date | null;
    serial: string;

    // 7. Comercial
    fractional: boolean;
    saleByWeight: boolean;
    promotional: boolean;
    promotionalPrice: number;
    promotionStart: Date | null;
    promotionEnd: Date | null;
    isKit: boolean;
    allowSaleWithoutStock: boolean;

    // 8. Integrações
    erpCode: string;
    accountingCode: string;
    syncEcommerce: boolean;
    image: string;
    notes: string;
}

export type ProductErrors = Record<string, string>;
