import { getPDVNowAPI } from "@/api/generated";
import type { CreateSupplierRequest, GetApiV1SuppliersParams, SupplierResponse, UpdateSupplierRequest } from "@/api/generated";

const api = getPDVNowAPI();

export async function addNewSupplier(params: CreateSupplierRequest): Promise<SupplierResponse> {
    return await api.postApiV1Suppliers(params);
}

export async function updateSupplier(id: string, params: UpdateSupplierRequest): Promise<SupplierResponse> {
    return await api.putApiV1SuppliersId(id, params);
}

export async function fetchSuppliers(params?: GetApiV1SuppliersParams) {
    const data = await api.getApiV1Suppliers(params);
    return data as SupplierResponse[];
}

export async function deleteSupplier(id: string) {
    await api.deleteApiV1SuppliersId(id);
}

export async function getSupplierById(id: string) {
    const data = await api.getApiV1SuppliersId(id);
    return data;
}
