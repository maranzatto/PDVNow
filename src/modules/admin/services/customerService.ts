import { getPDVNowAPI } from "@/api/generated";
import type { CreateCustomerRequest, CustomerResponse, GetApiV1CustomersParams, UpdateCustomerRequest } from "@/api/generated";

const api = getPDVNowAPI();

export async function addNewCustomer(params: CreateCustomerRequest): Promise<CustomerResponse> {
    return await api.postApiV1Customers(params);
}

export async function updateCustomer(id: string, params: UpdateCustomerRequest): Promise<CustomerResponse> {
    return await api.putApiV1CustomersId(id, params);
}

export async function fetchCustomers(params?: GetApiV1CustomersParams) {
    const data = await api.getApiV1Customers(params);
    return data as CustomerResponse[];
}

export async function deleteCustomer(id: string) {
    await api.deleteApiV1CustomersId(id);
}

export async function getCustomersById(id: string) {
    const data = await api.getApiV1CustomersId(id);
    return data;
}
