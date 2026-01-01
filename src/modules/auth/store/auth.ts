import { defineStore } from "pinia";
import { login, logout, refreshToken, isAuthenticated } from "@/modules/auth/services/authService";
import type { AuthState } from "../types/AuthState";

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: isAuthenticated(),
    }),

    actions: {
        async login(credentials: { username: string; password: string }) {
            try {
                const response = await login(credentials);
                this.user = {
                    id: response.userId || null,
                    username: response.username || null,
                    userType: response.userType || null,
                };
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                console.error("Login failed:", error);
                throw error;
            }
        },

        async refresh() {
            const token = localStorage.getItem("refreshToken");
            if (!token) return false;

            try {
                const response = await refreshToken(token);
                this.user = {
                    id: response.userId || null,
                    username: response.username || null,
                    userType: response.userType || null,
                };
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                console.error("Failed to refresh token:", error);
                this.logout();
                return false;
            }
        },

        logout() {
            logout();
            this.user = null;
            this.isAuthenticated = false;
        },
    },
});
