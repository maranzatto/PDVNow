export interface CashRegisterForm {
    cashRegisterId?: string;
    cashRegisterName?: string;
    location?: string;
    openingFloatAmount: number;
    overrideCode: string;
}

export type CashRegisterErrors = Record<string, string>;
