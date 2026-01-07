import { getPDVNowAPI } from "@/api/generated";
import type { CreateUserRequest, GetApiV1SuppliersParams, UserResponse, UpdateUserRequest } from "@/api/generated";

const api = getPDVNowAPI();

export async function addNewUser(params: CreateUserRequest): Promise<UserResponse> {
    return await api.postApiV1Users(params);
}

export async function updateUser(id: string, params: UpdateUserRequest): Promise<UserResponse> {
    return await api.putApiV1UsersId(id, params);
}

export async function fetchUsers(params?: GetApiV1SuppliersParams) {
    const data = await api.getApiV1Users(params);
    return data as UserResponse[];
}

export async function deleteUser(id: string) {
    await api.deleteApiV1UsersId(id);
}

export async function getUserById(id: string) {
    const data = await api.getApiV1UsersId(id);
    return data;
}
