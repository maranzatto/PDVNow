export interface AuthState {
    user: {
        id: string | null;
        username: string | null;
        userType: string | null;
    } | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
