import type { UserType } from "@/api/generated";

export interface AuthState {
    user: {
        id: string | null;
        username: string | null;
        userType: UserType | null;
    } | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
