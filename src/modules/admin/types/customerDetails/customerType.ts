import type { CustomerPersonType } from "@/api/generated";

export interface CustomerForm {
    id?: string;
    code?: number;

    name?: string | null | undefined;
    personType?: CustomerPersonType;
    tradeName?: string | null;
    document?: string | null;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    birthDate?: string | Date | null;

    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;

    notes?: string | null | undefined;
    creditLimit?: number;
    currentBalance?: number;

    isActive?: boolean;

    createdAtUtc?: string;
    updatedAtUtc?: string | null;
}

export type CustomerErrors = Record<string, string>;
