// types/supplier.types.ts
export interface SupplierForm {
    name: string;
    cnpj: string;
    contact: string;
    email: string;
    city: string;
    state: string;
    rating: number;
    status: "active" | "inactive";
}

export type SupplierErrors = Record<string, string>;
