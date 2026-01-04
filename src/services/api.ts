import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Ignora erros que não são 401 ou se é o próprio endpoint de refresh/login
        if (error.response?.status !== 401 || originalRequest.url?.includes("/api/v1/auth/refresh") || originalRequest.url?.includes("/api/v1/auth/login")) {
            return Promise.reject(error);
        }

        // Se já marcou como _retry, não tenta novamente
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        // Se já está fazendo refresh, coloca na fila
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => axiosInstance(originalRequest))
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Tenta refresh
            await axiosInstance.post("/api/v1/auth/refresh");

            processQueue(null, null);
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);

            // Só redireciona uma vez
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

// Exportação para o Orval usar como mutator
export const api = <T>(config: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.request<T>(config).then(({ data }) => data);
};

// Exportação padrão da instância do axios
export default axiosInstance;
