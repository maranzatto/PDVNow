import { getPDVNowAPI } from "@/api/generated";
import type { CreateProductRequest, GetApiV1ProductsParams, ProductResponse, UpdateProductRequest } from "@/api/generated";

const api = getPDVNowAPI();

export async function addNewProduct(params: CreateProductRequest): Promise<ProductResponse> {
    return await api.postApiV1Products(params);
}

export async function updateProduct(id: string, params: UpdateProductRequest): Promise<ProductResponse> {
    return await api.putApiV1ProductsId(id, params);
}

export async function fetchProducts(params?: GetApiV1ProductsParams) {
    const data = await api.getApiV1Products(params);
    return data as ProductResponse[];
}

export async function deleteProduct(id: string) {
    await api.deleteApiV1ProductsId(id);
}

export async function getProductById(id: string) {
    const data = await api.getApiV1ProductsId(id);
    return data;
}
