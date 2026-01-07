import { getPDVNowAPI } from "@/api/generated";
import type {
    CashRegisterResponse,
    CashSessionResponse,
    OpenCashSessionRequest,
    CloseCashSessionRequest,
    CreateCashMovementRequest,
} from "@/api/generated";

const api = getPDVNowAPI();

// Lista caixas
export async function fetchCashRegisters(): Promise<CashRegisterResponse[]> {
    return await api.getApiV1CashRegisters();
}

// Sessão atual de um caixa
export async function getCashRegisterSession(cashRegisterId: string): Promise<CashSessionResponse> {
    return await api.getApiV1CashRegistersCashRegisterIdSession(cashRegisterId);
}

// Abrir caixa
export async function openCashSession(params: OpenCashSessionRequest): Promise<CashSessionResponse> {
    return await api.postApiV1CashOpen(params);
}

// Fechar caixa
export async function closeCashSession(params: CloseCashSessionRequest): Promise<CashSessionResponse> {
    return await api.postApiV1CashClose(params);
}

// Movimentação
export async function createCashMovement(params: CreateCashMovementRequest): Promise<void> {
    await api.postApiV1CashMovements(params);
}
