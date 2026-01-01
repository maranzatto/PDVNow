import { getPDVNowAPI } from "@/api/generated";
import type { GetApiV1ProductsParams, ProductResponse } from "@/api/generated";

const api = getPDVNowAPI();

export async function fetchProducts(params?: GetApiV1ProductsParams) {
    const data = await api.getApiV1Products(params);
    return data as ProductResponse[];
}

export async function deleteProduct(id: string) {
    await api.deleteApiV1ProductsId(id);
}
