import { defineStore } from "pinia";
import { login, logout as logoutService, getCurrentUser } from "@/modules/auth/services/authService";
import type { AuthState } from "../types/AuthState";

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
        isLoading: true, // Para controlar carregamento inicial
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

        async logout() {
            try {
                await logoutService(); // Chama endpoint de logout
            } finally {
                this.user = null;
                this.isAuthenticated = false;
            }
        },

        async checkAuth() {
            // Verifica autenticação consultando /me
            this.isLoading = true;
            try {
                const response = await getCurrentUser();

                if (response) {
                    this.user = {
                        id: response.userId || null,
                        username: response.username || null,
                        userType: response.userType || null,
                    };
                    this.isAuthenticated = true;
                    return true;
                } else {
                    this.user = null;
                    this.isAuthenticated = false;
                    return false;
                }
            } catch (error) {
                console.error("Failed to check auth:", error);
                this.user = null;
                this.isAuthenticated = false;
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        // Método para inicializar a store ao carregar a aplicação
        async initialize() {
            await this.checkAuth();
        },
    },
});
