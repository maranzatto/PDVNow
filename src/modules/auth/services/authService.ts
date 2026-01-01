import { getPDVNowAPI } from "@/api/generated";
import type { LoginRequest, AuthResponse, RefreshRequest } from "@/api/generated";

const api = getPDVNowAPI();

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const data = await api.postApiV1AuthLogin(credentials);
    if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken || "");
    }
    return data;
}

export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
    const data = await api.postApiV1AuthRefresh({ refreshToken } as RefreshRequest);
    if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken || "");
    }
    return data;
}

export function logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
}

export function getAuthToken(): string | null {
    return localStorage.getItem("accessToken");
}
