import { getPDVNowAPI } from "@/api/generated";
import type { LoginRequest, AuthResponseDto } from "@/api/generated";

const api = getPDVNowAPI();

export async function login(credentials: LoginRequest): Promise<AuthResponseDto> {
    // Cookies são definidos automaticamente pelo backend
    const data = await api.postApiV1AuthLogin(credentials);
    return data;
}

export async function refreshToken(): Promise<AuthResponseDto> {
    // Não precisa enviar nada - cookies são enviados automaticamente
    const data = await api.postApiV1AuthRefresh();
    return data;
}

export async function logout(): Promise<void> {
    try {
        // Chama endpoint de logout que revoga o refresh token
        await api.postApiV1AuthLogout();
    } catch (error) {
        console.error("Logout error:", error);
    }
}

export async function getCurrentUser(): Promise<AuthResponseDto | null> {
    try {
        // Verifica se está autenticado consultando /me
        const data = await api.getApiV1AuthMe();
        return data;
    } catch (error) {
        console.error("Get current user error:", error);
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}
