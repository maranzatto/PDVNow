// types/supplier.types.ts
export interface SupplierForm {
    id?: string;

    name?: string | null | undefined;
    tradeName?: string | null;
    cnpj?: string | null;
    stateRegistration?: string | null;

    email?: string | null;
    phone?: string | null;

    addressLine1?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;

    isActive?: boolean;

    createdAtUtc?: string | null;
    updatedAtUtc?: string | null;
}

export type SupplierErrors = Record<string, string>;
